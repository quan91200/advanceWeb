import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useTranslation } from 'react-i18next'
import { Head, Link, router } from '@inertiajs/react'
import Tabs from '@/Components/Tabs'
import Button from '@/Components/Button'
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal'
import EditUserModal from '@/Pages/User/Edit'
import UserInfoItem from '@/Components/UserInfoItem'
import { IoIosMore } from "react-icons/io"

const Show = ({ user }) => {
    const [t, i18n] = useTranslation("global")
    const language = i18n.language
    const getUserAgent = (userAgent) => {
        const match = userAgent.match(/Mozilla\/[^\s]+\s?\([^\)]*\)/)
        return match ? match[0] : userAgent
    }
    const joinDate = new Date(user.created_at)
    const formatUser = joinDate.toLocaleDateString(language, {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [postToDelete, setPostToDelete] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteClick = (post) => {
        setPostToDelete(post)
        setShowDeleteModal(true)
    }
    const deletePost = () => {
        if (postToDelete) {
            setIsLoading(true)
            router.delete(route("posts.destroy", postToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false)
                },
                onError: () => {
                    setShowDeleteModal(false)
                },
            })
        }
    }
    const [isModalOpen, setModalOpen] = useState(false)
    const closeModal = () => setModalOpen(false)
    const tabData = [
        {
            label: (
                <>{t("user.show.info")}</>
            ),
            content: (
                <div className="flex items-start justify-center flex-row gap-3">
                    <div className='w-2/5 flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 bg-white dark:bg-gray-800 rounded-sm shadow-md dark:text-gray-100 p-6'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>{t('user.show.intro')}</h2>
                                {user.id === user.auth && (
                                    <span className='hover:text-gray-500'>
                                        <button
                                            onClick={() => setModalOpen(true)}
                                            className="ml-4 text-gray-500 hover:text-gray-700 hover:underline"
                                        >
                                            {t('button.edit')}
                                        </button>
                                        <EditUserModal
                                            user={user}
                                            isOpen={isModalOpen}
                                            onClose={closeModal}
                                        />
                                    </span>
                                )}
                            </div>
                            <ul className="space-y-4">
                                <UserInfoItem
                                    icon="fas fa-briefcase"
                                    label={t('user.show.work')}
                                    value={user.job}
                                    bgColor="bg-blue-100 dark:bg-blue-900"
                                    textColor="text-blue-600 dark:text-blue-300"
                                    iconColor="text-blue-600 dark:text-blue-300"
                                />
                                <UserInfoItem
                                    icon="fas fa-map-marker-alt"
                                    label={t('user.show.home')}
                                    value={user.address}
                                    bgColor="bg-green-100 dark:bg-green-900"
                                    textColor="text-green-600 dark:text-green-300"
                                    iconColor="text-green-600 dark:text-green-300"
                                />
                                <UserInfoItem
                                    icon="fas fa-heart"
                                    label={t('user.show.relationship')}
                                    value={user.relationship}
                                    bgColor="bg-red-100 dark:bg-red-900"
                                    textColor="text-red-600 dark:text-red-300"
                                    iconColor="text-red-600 dark:text-red-300"
                                />
                                <UserInfoItem
                                    icon="fas fa-birthday-cake"
                                    label={t('user.show.dob')}
                                    value={user.dob}
                                    bgColor="bg-purple-100 dark:bg-purple-900"
                                    textColor="text-purple-600 dark:text-purple-300"
                                    iconColor="text-purple-600 dark:text-purple-300"
                                />
                                <UserInfoItem
                                    icon="fas fa-birthday-cake"
                                    label={t('user.show.hobbies')}
                                    value={user.hobbies}
                                    bgColor="bg-purple-100 dark:bg-purple-900"
                                    textColor="text-purple-600 dark:text-purple-300"
                                    iconColor="text-purple-600 dark:text-purple-300"
                                />
                            </ul>
                        </div>
                        <div className='flex flex-col gap-3 items-start bg-white dark:bg-gray-800 rounded-sm dark:text-gray-100 shadow-md p-5'>
                            <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>{t('user.show.photos')}</h2>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex-shrink-0">
                                    <img
                                        src={user.profile_pic}
                                        className="w-28 h-28 rounded-md object-cover"
                                    />
                                </div>
                                {user.posts.map((post) => (
                                    <div key={post.id} className="flex-shrink-0">
                                        <img
                                            src={post.image_url}
                                            className="w-28 h-28 rounded-md object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-3/5'>
                        {user.posts.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                {t('no_posts_found')}
                                <Link
                                    href={route("posts.create")}
                                    className='underline text-blue-500 hover:text-white hover:no-underline'
                                >
                                    {t('post.create.title')}
                                </Link>
                            </div>)
                            : (user.posts.map((post) => {
                                const createdAt = new Date(user.created_at)
                                const formatDate = createdAt.toLocaleDateString(language, {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                })
                                return (
                                    <div key={post.id} className="dark:bg-gray-800 rounded-md dark:text-gray-100 mb-3 bg-white shadow-md">
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src={post.user.profile_pic ? post.user.profile_pic : '/storage/images/default.png'}
                                                    alt="User Avatar"
                                                    className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-md object-cover"
                                                />
                                                <div className='flex flex-col gap-1'>
                                                    <span className="text-gray-800 dark:text-white font-medium">{post.user.name}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {formatDate}
                                                    </span>
                                                </div>
                                            </div>
                                            {user.id === user.auth && (
                                                <div className='relative'>
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <IoIosMore
                                                                size={25}
                                                                className='cursor-pointer text-gray-500 transition duration-150 
                                                                ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 
                                                                dark:text-gray-400 dark:hover:text-gray-300'
                                                            />
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href={route("posts.edit", post.id)}>
                                                                {t('button.edit')}
                                                            </Dropdown.Link>
                                                            <Dropdown.Link onClick={() => handleDeleteClick(post)}>
                                                                {t('button.delete')}
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>)}
                                        </div>
                                        <div className='hover:dark:bg-gray-700 transition-all'>
                                            <div className="px-4 text-gray-800 dark:text-white">
                                                <p>{post.content}</p>
                                            </div>
                                            {post.image_url && (
                                                <div className="px-4">
                                                    <img
                                                        className="rounded-lg object-contain w-full h-96"
                                                        src={post.image_url}
                                                        alt="Post Image"
                                                    />
                                                </div>)}
                                        </div>
                                        <div className="p-4 text-gray-500 dark:text-gray-400">
                                            Comment
                                        </div>
                                    </div>
                                )
                            }))}
                    </div>
                </div>
            )
        },
        ...(user.id === user.auth ? [
            {
                label: <>{t("user.show.sessions")}</>,
                content: (
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-sm p-6 dark:text-white">
                        <div>
                            {user.sessions.length > 0 ? (
                                user.sessions.map((session, index) => (
                                    <div key={session.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow mb-4">
                                        <p>
                                            <strong>ID:</strong> ****{session.id.slice(-3)}
                                        </p>
                                        <p>
                                            <strong>{t('user.show.ip_address')}:</strong> {session.ip_address}
                                        </p>
                                        <p>
                                            <strong>{t('user.show.user_agent')}:</strong> {getUserAgent(session.user_agent)}
                                        </p>
                                        <p>
                                            <strong>{t('user.show.last_activity')}:</strong>{" "}
                                            {new Date(session.last_activity * 1000).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No active sessions.</p>
                            )}
                        </div>
                    </div>
                ),
            },
        ] : []),

    ]
    return (
        <AuthenticatedLayout>
            <Head title={user.name} />
            <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 mt-5 pb-10">
                <div >
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-sm p-6 flex items-center gap-3 relative" >
                        <div className="flex items-center space-x-6">
                            <img
                                src={user.profile_pic}
                                alt={`${user.name}'s profile`}
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                            />
                            <div>
                                <h3 className="text-2xl font-bold dark:text-gray-100">{user.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-0 mr-4">
                            <p className='text-gray-600 dark:text-gray-300'><span className="font-medium">{t("user.created_at")}:</span> {formatUser}</p>
                        </div>
                    </div>
                    <hr className='mx-4' />
                    <Tabs
                        tabs={tabData}
                        defaultActiveIndex={0}
                        headerClass='bg-white dark:bg-gray-800 p-3 shadow-md'
                        activeTabClass='text-blue-500 border-b-2 border-b-blue-500'
                    />
                </div>
            </div>
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                maxWidth="sm"
            >
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">{t('post.delete.title')}</h3>
                    <div className="mt-4 flex justify-end gap-4">
                        <Button variant="warning" onClick={() => setShowDeleteModal(false)}>
                            {t('button.cancel')}
                        </Button>
                        <Button variant="primary" onClick={deletePost} disabled={isLoading}>
                            {isLoading ? t('button.deleting') : t('button.delete')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Show