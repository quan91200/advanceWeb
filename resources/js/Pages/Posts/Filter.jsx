import React, { useState } from 'react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'

const Filter = ({ posts, authUserId, setFilteredPosts }) => {
    const [filterType, setFilterType] = useState('all')
    const [t, i18n] = useTranslation("global")

    const handleFilterChange = (type) => {
        setFilterType(type)

        let filtered = [...posts]

        switch (type) {
            case 'mine':
                filtered = filtered.filter((post) => post.user_id === authUserId)
                break
            default:
                filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }

        setFilteredPosts(filtered)
    }

    return (
        <div className="flex gap-3">
            <Button
                size='medium'
                variant={filterType === 'all' ? 'primary' : 'info'}
                onClick={() => handleFilterChange('all')}
            >
                {t('sort.all')}
            </Button>
            <Button
                size='medium'
                variant={filterType === 'mine' ? 'primary' : 'info'}
                onClick={() => handleFilterChange('mine')}
            >
                {t('sort.mine')}
            </Button>
        </div>
    )
}

export default Filter