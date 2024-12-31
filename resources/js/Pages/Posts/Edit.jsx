import React, { useEffect } from 'react'
import { useForm, router } from '@inertiajs/react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'

const Edit = ({ closeModal, post }) => {
    const [t] = useTranslation("global")
    const {
        data,
        setData,
        reset,
        clearErrors
    } = useForm({
        content: post.content || '',
        status: post.status || 'public',
        imageUrl: '',
    })

    useEffect(() => {
        if (post) {
            setData({
                content: post.content || '',
                status: post.status || 'public',
                imageUrl: '',
            })
        }
    }, [post])

    const handleClose = () => {
        closeModal()
        clearErrors()
        reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (data.content !== post.content) {
            formData.append('content', data.content)
        }
        if (data.status !== post.status) {
            formData.append('status', data.status)
        }
        if (data.imageUrl && data.imageUrl instanceof File) {
            formData.append('image_url', data.imageUrl)
        }
        if (formData.has('content')
            || formData.has('status')
            || formData.has('image_url')) {
            router.patch(`/posts/${post.id}`, formData, {
                onSuccess: () => {
                    closeModal()
                },
                onError: (errorResponse) => {
                    console.log('Errors:', errorResponse)
                },
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium dark:text-white">{t('post.content')}</label>
                <textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium dark:text-white">{t('post.status')}</label>
                <select
                    id="status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="public">{t('status.public')}</option>
                    <option value="private">{t('status.private')}</option>
                    <option value="friend">{t('status.friend')}</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="image_url" className="block text-sm font-medium dark:text-white">Image URL (optional)</label>
                <input
                    type="file"
                    id="image_url"
                    onChange={(e) => setData('imageUrl', e.target.files[0])}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    variant='primary'
                    onClick={handleClose}
                >
                    {t('base.cancel')}
                </Button>
                <Button
                    type="submit"
                    variant='success'
                >
                    {t('base.update')}
                </Button>
            </div>
        </form>
    )
}

export default Edit