import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import Modal from '@/Components/Modal'
import CreatePostForm from './Create'
import EditPostForm from './Edit'
import DeletePostForm from './Delete'
import Button from '@/Components/Button'
import Filter from './Filter'
import Comment from '@/Components/Comment'

const Index = ({ auth, post }) => {
    const [t, i18n] = useTranslation("global")
    const { posts } = usePage().props.auth
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState(null)
    const [filteredPosts, setFilteredPosts] = useState(posts)

    const openCreateModal = () => {
        setSelectedPost(null)
        setIsModalOpen(true)
    }

    const openEditModal = (post) => {
        setSelectedPost(post)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedPost(null)
    }

    const openDeleteModal = (post) => {
        setPostToDelete(post)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setPostToDelete(null)
    }

    const resetModalOnPageChange = () => {
        closeModal()
    }

    useEffect(() => {
        resetModalOnPageChange()
    }, [usePage().url])

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight dark:text-white">
                    {t('base.post')}
                </h2>
            }
        >
            <Head title="Article Space" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className='flex items-center gap-3 mb-6'>
                                <Button variant='info' onClick={openCreateModal} size='medium'>
                                    {t('post.create')}
                                </Button>
                                <Filter
                                    posts={posts}
                                    authUserId={auth.user.id}
                                    setFilteredPosts={setFilteredPosts}
                                />
                            </div>
                            {filteredPosts && filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <div key={post.id} className="my-6 p-4 rounded-lg bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={post.user.profile_pic ? `/storage/${post.user.profile_pic}` : '/storage/images/default.png'}
                                                alt="User Avatar"
                                                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {post.user.name}
                                                </p>

                                                <div className='flex items-center gap-2'>
                                                    <p className="text-sm text-gray-600 dark:text-slate-200 capitalize">
                                                        {t(`status.${post.status}`)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(post.created_at).toLocaleString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {post.image_url && (
                                            <img
                                                src={`/storage/${post.image_url}`}
                                                alt="Post Image"
                                                className="w-full h-64 object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-500 mb-2">{post.content}</h3>
                                        <div className="mt-4 flex space-x-4">
                                            {post.user_id === auth.user.id && (
                                                <>
                                                    <Button variant="warning" onClick={() => openEditModal(post)}>
                                                        {t('base.edit')}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="primary"
                                                        onClick={() => openDeleteModal(post)}
                                                    >
                                                        {t('base.delete')}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <Comment />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-lg text-gray-600 dark:text-white">{t('post.nopost')}</p>
                            )}
                            <Modal show={isModalOpen} onClose={closeModal}>
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                                        {selectedPost ? t('post.edit') : t('post.create')}
                                    </h2>
                                    {selectedPost ? (
                                        <EditPostForm closeModal={closeModal} post={selectedPost} />
                                    ) : (
                                        <CreatePostForm
                                            closeModal={closeModal} />
                                    )}
                                </div>
                            </Modal>
                            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                                <DeletePostForm post={postToDelete} closeModal={closeDeleteModal} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index