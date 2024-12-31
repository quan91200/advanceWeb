import React, { useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'

const Create = ({ closeModal, onPostCreated }) => {
    const [t, i18n] = useTranslation("global")
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('public')
    const [imageFile, setImageFile] = useState(null)
    const [err, setErr] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCancel = () => {
        closeModal()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const requestData = {
            content,
            status,
            image_url: imageFile,
        }

        router.post('/posts', requestData, {
            onSuccess: (newPost) => {
                closeModal()
                if (onPostCreated)
                    onPostCreated(newPost)
                setIsSubmitting(false)
            },
            onError: (errors) => {
                console.log('Errors:', errors)
                setErr(errors)
                setIsSubmitting(false)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium dark:text-white">{t('post.content')}</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium dark:text-white">{t('post.status')}</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    variant='primary'
                    onClick={handleCancel}
                >
                    {t('base.cancel')}
                </Button>
                <Button
                    type="submit"
                    variant='success'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('base.creating') : t('base.create')}
                </Button>
            </div>
        </form>
    )
}

export default Create