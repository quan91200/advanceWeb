import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import Pagination from '@/Components/Pagination'
import Button from '@/Components/Button'
import Modal from '@/Components/Modal'
import Toast from '@/Components/Toast'
import React, { useState } from "react"

export default function Dashboard({ posts, auth, user }) {
    const [t, i18n] = useTranslation("global")
    const language = i18n.language
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [postToDelete, setPostToDelete] = useState(null)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('success')
    const [isLoading, setIsLoading] = useState(false)
    const closeToast = () => {
        setToastOpen(false)
    }
    const handleDeleteClick = (post) => {
        setPostToDelete(post)
        setShowDeleteModal(true)
    }
    const deletePost = () => {
        if (postToDelete) {
            setIsLoading(true)
            router.delete(route("posts.destroy", postToDelete.id), {
                onSuccess: () => {
                    setToastMessage('Post deleted successfully!')
                    setToastType('success')
                    setToastOpen(true)
                    setShowDeleteModal(false)
                },
                onError: () => {
                    setToastMessage('Failed to delete post!')
                    setToastType('error')
                    setToastOpen(true)
                    setShowDeleteModal(false)
                },
            })
        }
    }
    const joinDate = new Date(user.created_at)
    const formattedDate = joinDate.toLocaleDateString(language, {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-semibold leading-tight dark:text-white">
                    {t('base.dashboard')}
                </h2>
            }
        >
            <Head title={t('base.dashboard')} />
            <div className="py-12">
                <div className='mx-auto max-w-5xl sm:px-6 lg:px-8'>
                    <div className='dark:text-gray-100 dark:bg-gray-800 rounded relative flex items-start'>
                        <div className='h-32'>
                            <img
                                className='h-full object-cover w-28 rounded'
                                src={user.profile_pic ? `/storage/${user.profile_pic}` : user.profile_pic}
                            />
                        </div>
                        <div className='p-4'>
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-col'>
                                    <h3 className="text-gray-600 dark:text-gray-100 text-lg">{user.name}</h3>
                                    <h2 className="text-sm text-gray-600 dark:text-gray-400">{user.email}</h2>
                                </div>
                            </div>
                            <h2 className='text-sm text-gray-600 dark:text-gray-400 absolute bottom-4 right-4'>
                                {t("user.created_at")}: {formattedDate}
                            </h2>
                        </div>
                    </div>
                    <div className='my-6 text-gray-900 dark:text-gray-100'>
                        <div className='mb-4 flex items-center gap-3 justify-between'>
                            <Button
                                variant='info'
                            >
                                <Link href={route("posts.create")}>
                                    {t('post.create')}
                                </Link>
                            </Button>
                            <Button>
                                <Link
                                    href={route("posts.trashed", { userId: auth.user.id })}>
                                    {t('post.trashed')}
                                </Link>
                            </Button>
                        </div>
                        {posts.data.length === 0 ? (
                            <div className="text-center py-8 flex flex-col items-center gap-2">
                                <p className="text-lg text-gray-600 dark:text-gray-400">{t('base.no_posts_found')}</p>

                                <Button variant='info'>
                                    <Link
                                        href={route("posts.create")}
                                    >
                                        {t('post.create')}
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            posts.data.map((post) => {
                                return (
                                    <div key={post.id} className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-transform transform hover:shadow-xl my-5">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={post.user.profile_pic ? `${post.user.profile_pic}` : '/storage/images/default.png'}
                                                alt="User Avatar"
                                                className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-blue-500 shadow-md"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {post.user.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(post.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='dark:bg-gray-950 p-3 rounded-lg'>
                                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-300 mb-3">{post.content}</h3>
                                            {post.image_url && (
                                                <img
                                                    src={post.image_url}
                                                    alt="Post Image"
                                                    className="w-full h-64 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
                                                />
                                            )}
                                        </div>
                                        <div className="mt-4 flex justify-end space-x-4">
                                            <Button variant='outlineWarning' >
                                                <Link
                                                    href={route("posts.edit", post.id)}
                                                >
                                                    {t('base.edit')}
                                                </Link>
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outlinePrimary"
                                                onClick={() => handleDeleteClick(post)}
                                            >
                                                {t('base.delete')}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
            {posts.meta && posts.meta.links && <Pagination links={posts.meta.links} />}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                maxWidth="sm"
            >
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">{t('post.desc')}</h3>
                    <div className="mt-4 flex justify-end gap-4">
                        <Button variant="warning" onClick={() => setShowDeleteModal(false)}>
                            {t('base.cancel')}
                        </Button>
                        <Button variant="primary" onClick={deletePost} disabled={isLoading}>
                            {isLoading ? t('base.deleting') : t('base.delete')}
                        </Button>
                    </div>
                </div>
            </Modal>
            <Toast
                pos='top-right'
                open={toastOpen}
                onClose={closeToast}
                message={toastMessage}
                type={toastType}
                duration={3000}
            />
        </AuthenticatedLayout>
    )
}