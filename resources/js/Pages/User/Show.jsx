import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { FaCommentDots } from "react-icons/fa"
import { FcLike } from "react-icons/fc"
import { FaShare } from "react-icons/fa"
import { Head, Link } from '@inertiajs/react'
import FriendsCarousel from '@/Components/FriendsCarousel'
import UserInfo from '@/Components/UserInfo'
import Dropdown from '@/Components/Dropdown'
import { MdMoreHoriz } from "react-icons/md"
import { useTranslation } from 'react-i18next'

const Show = ({
    user,
    notFriends,
    friendsList
}) => {
    const { t } = useTranslation()
    return (
        <AuthenticatedLayout>
            <Head title={user.name || "User Profile"} />
            <div className="pt-10">
                <div className="flex items-center flex-col relative">
                    <div className="dark:bg-gray-800 bg-gray-200 w-full absolute h-44"></div>
                    <div className="z-[2] flex items-center justify-between h-64 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                        {/*Avatar Profile */}
                        <div className="flex items-center gap-4">
                            <div className="lg:h-40 lg:w-40 sm:h-28 sm:w-28 border dark:border-blue-700 rounded-full">
                                <img
                                    src={user.profile_pic || ""}
                                    className="w-full h-full object-cover rounded-full bg-slate-600"
                                />
                            </div>
                            <div className="flex flex-col items-start dark:text-gray-50">
                                <h2 className="font-bold text-xl">{user.name || "Unknown User"}</h2>
                                <h4>{user.friends_count || 0} {t('title.friend')}</h4>
                                <div className="flex items-center -space-x-2">
                                    {friendsList?.map((friend, index) => (
                                        <div key={index} className="h-9 w-9">
                                            <Link href={route("users.show", friend.id)}>
                                                <img
                                                    src={friend.profile_pic ? `/storage/${friend.profile_pic}` : ""}
                                                    className="rounded-full h-full w-full object-cover border border-gray-100 cursor-pointer bg-slate-600"
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Content */}
                    <div className="max-w-3xl w-full dark:text-gray-50 mx-auto space-y-3">
                        {/*People U May Know */}
                        {user.auth === user.id && notFriends?.length > 0 && (
                            <div className="dark:bg-slate-700 p-3 rounded-md">
                                <div className="flex flex-col space-x-3 border border-gray-300 p-2 rounded-lg w-full">
                                    <div className='flex items-center justify-between space-x-2'>
                                        <h3 className="text-lg font-semibold dark:text-gray-50 p-1">
                                            {t('title.people')}
                                        </h3>
                                        <div className="p-1 hover:no-underline underline cursor-pointer opacity-75 hover:opacity-100">
                                            <Link href={route("friends.index")}>{t('button.seeAll')}</Link>
                                        </div>
                                    </div>
                                    <div className="max-w-full overflow-hidden">
                                        <FriendsCarousel notFriends={notFriends} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/*User Info */}
                        <div className="p-6 dark:bg-gray-700 bg-gray-50 rounded-md shadow-lg space-y-6 mb-3">
                            <div className="flex items-center justify-between mx-2">
                                <h2 className="text-2xl font-semibold dark:text-white">{t('title.personal')}</h2>
                                {user.auth === user.id && (
                                    <Link
                                        href={route("users.edit", user.id)}
                                        className="inline-block underline opacity-75 hover:no-underline"
                                    >
                                        {t('button.editDetails')}
                                    </Link>
                                )}
                            </div>
                            <UserInfo user={user} />
                        </div>
                        {/*Posts */}
                        <div>
                            {user.posts.length > 0 ? (
                                user.posts.map((post) => (
                                    <div key={post.id} className="p-6 dark:bg-gray-700 bg-gray-50 rounded-md shadow-lg my-3">
                                        <div className="flex flex-col space-y-3">
                                            <div className='flex justify-between'>
                                                <div className="flex items-center mb-2 space-x-2">
                                                    <img
                                                        src={user.profile_pic || ""}
                                                        alt="User Profile"
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <Link href={route("users.show", user.id)}>
                                                            <p className="font-bold text-lg hover:underline">{user.name}</p>
                                                        </Link>
                                                        <p className="text-sm capitalize">{post.created_at} • {post.status}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {user.auth === user.id && (
                                                        <div className="flex items-center space-x-2">
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <MdMoreHoriz className='hover:opacity-75 hover:scale-125' size={23} />
                                                                </Dropdown.Trigger>
                                                                <Dropdown.Content align='right'>
                                                                    <Dropdown.Link href={route('posts.edit', { id: post.id })}>{t('button.edit')}</Dropdown.Link>
                                                                    <Dropdown.Link onClick={() => deletePost(post.id)}>{t('button.delete')}</Dropdown.Link>
                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                    {post.content || "No content available"}
                                                </h2>
                                            </div>
                                            {post.image_url && (
                                                <div>
                                                    <img
                                                        src={post.image_url}
                                                        alt="Post"
                                                        className="w-full h-96 object-cover hover:opacity-75 cursor-pointer rounded"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex space-x-4 items-center justify-around">
                                                <button className="flex items-center space-x-2 opacity-75 hover:bg-slate-400 rounded px-3 py-2">
                                                    <FcLike /> <p>{t('button.react')}</p>
                                                </button>
                                                <button className="flex items-center space-x-2 opacity-75 hover:bg-slate-400 rounded px-3 py-2">
                                                    <FaCommentDots /> <p>{t('button.comment')}</p>
                                                </button>
                                                <button className="flex items-center space-x-2 opacity-75 hover:bg-slate-400 rounded px-5 py-2">
                                                    <FaShare /> <p>{t('button.share')}</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex items-center justify-center text-xl font-bold'>{t('desc.noPost')}</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Show
