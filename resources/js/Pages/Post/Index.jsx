import React, { useState } from 'react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import Modern from '@/Components/Post/Modern'
import Basic from '@/Components/Post/Basic'
import Interactive from '@/Components/Post/Interactive'

import { IoGrid } from "react-icons/io5"
import { BsFillGrid1X2Fill } from "react-icons/bs"
import { SiSendgrid } from "react-icons/si"
import { useTranslation } from 'react-i18next'

const Index = ({ posts }) => {
    const { t } = useTranslation()
    const [postStyle, setPostStyle] = useState('interactive')
    const { data } = posts
    const handlePostStyleChange = (style) => {
        setPostStyle(style)
    }
    return (
        <AuthenticatedLayout>
            <Head title={t('title.post')} />
            <div className='max-w-3xl mx-auto pt-16 flex justify-end'>
                <button
                    className="flex items-center px-4 py-2 rounded dark:bg-blue-600 bg-blue-500 text-white"
                    onClick={() => {
                        const nextStyle = postStyle === 'modern' ? 'basic' :
                            postStyle === 'basic' ? 'interactive' : 'modern'
                        handlePostStyleChange(nextStyle)
                    }}
                >
                    {postStyle === 'basic' && <IoGrid />}
                    {postStyle === 'modern' && (<BsFillGrid1X2Fill />)}
                    {postStyle === 'interactive' && (<SiSendgrid />)}
                </button>
            </div>

            <div className='max-w-3xl mx-auto my-5'>
                {data.map((post) => {
                    if (postStyle === 'basic') {
                        return <Basic key={post.id} post={post} />
                    }
                    if (postStyle === 'modern') {
                        return <Modern key={post.id} post={post} />
                    }
                    if (postStyle === 'interactive') {
                        return <Interactive key={post.id} post={post} />
                    }
                })}
            </div>
            <Pagination links={posts.meta.links} />
        </AuthenticatedLayout>
    )
}

export default Index