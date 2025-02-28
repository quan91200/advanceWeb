import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { FaLinkedin } from "react-icons/fa"
import { FaSquareFacebook } from "react-icons/fa6"
import { IoLogoYoutube } from "react-icons/io"
import { FaSquareGithub } from "react-icons/fa6"
import { FaCommentDots } from "react-icons/fa"
import { FcLike } from "react-icons/fc"
import { FaShare } from "react-icons/fa"
import { Head, Link, useForm } from '@inertiajs/react'
import FriendsCarousel from '@/Components/FriendsCarousel'
import Button from '@/Components/Button'
import UserInfo from '@/Components/UserInfo'
import { BsPersonCheck } from "react-icons/bs"
import { HiUserAdd } from "react-icons/hi"
import { HiUserRemove } from "react-icons/hi"
import { GiCancel } from "react-icons/gi"
import { FiUserX } from "react-icons/fi"

const Show = ({
    user,
    notFriends,
    friendsList,
    friendStatus: initialStatus,
    friendshipId: initialFriendshipId,
}) => {
    const [friendship, setFriendship] = useState({
        status: initialStatus,
        id: initialFriendshipId,
    })
    const { post, patch, delete: destroy, processing } = useForm({
        friend_id: user.id
    })
    const actions = {
        addFriend: () =>
            post(route('friends.addfriend'), {
                onSuccess: (response) => {
                    setFriendship({ status: 'pending', id: response.data.data.id })
                    showAlert('Gửi lời mời kết bạn thành công!')
                },
                onError: () => {
                    showAlert('Có lỗi xảy ra!', 'error')
                },
            }),

        acceptRequest: () =>
            patch(route('friends.update', friendship.id), {
                data: { status: 'accepted' },
                onSuccess: () => {
                    setFriendship({ status: 'accepted', id: friendship.id })
                    showAlert('Đã chấp nhận lời mời kết bạn!')
                },
                onError: () => {
                    showAlert('Có lỗi xảy ra!', 'error')
                },
            }),

        rejectRequest: () =>
            patch(route('friends.update', friendship.id), {
                data: { status: 'rejected' },
                onSuccess: () => {
                    setFriendship({ status: 'none', id: null })
                    showAlert('Đã từ chối lời mời kết bạn!')
                },
                onError: () => {
                    showAlert('Có lỗi xảy ra!', 'error')
                },
            }),

        removeFriend: () =>
            destroy(route('friends.unfriend', friendship.id), {
                onSuccess: () => {
                    setFriendship({ status: 'none', id: null })
                    showAlert('Đã hủy kết bạn!')
                },
                onError: () => {
                    showAlert('Có lỗi xảy ra!', 'error')
                },
            }),
    }
    const renderFriendButton = () => {
        const { status } = friendship

        const buttonMap = {
            accepted: (
                <Button
                    variant="outlineInfo"
                    className="flex items-center space-x-2"
                    onClick={actions.removeFriend}
                    disabled={processing}
                >
                    <HiUserRemove size={20} />
                    <span>Unfriend</span>
                </Button>
            ),
            none: (
                <Button
                    variant="outlineInfo"
                    className="flex items-center space-x-2"
                    onClick={actions.addFriend}
                    disabled={processing}
                >
                    <HiUserAdd size={20} />
                    <span>Add Friend</span>
                </Button>
            ),
            pending: (
                <Button
                    variant="warning"
                    className="flex items-center space-x-2"
                    disabled={processing}
                >
                    <FiUserX />
                    <span>Pending</span>
                </Button>
            ),
            waiting_response: (
                <div className="flex items-center space-x-3">
                    <Button
                        variant="success"
                        onClick={actions.acceptRequest}
                        disabled={processing}
                        className="flex items-center space-x-2"
                    >
                        <BsPersonCheck />
                        <span>Accept</span>
                    </Button>
                    <Button
                        variant="warning"
                        onClick={actions.rejectRequest}
                        disabled={processing}
                        className="flex items-center space-x-2"
                    >
                        <GiCancel />
                        <span>Decline</span>
                    </Button>
                </div>
            ),
        }

        return buttonMap[status] || null
    }
    return (
        <AuthenticatedLayout>
            <Head title={user.name || "User Profile"} />
            <div className="">
                <div className="flex items-center flex-col relative">
                    <div className="dark:bg-gray-800 w-full absolute h-44"></div>
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
                                <h4>{user.friends_count || 0} friends</h4>
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
                        {/*Todo list Friend */}
                        <div className="flex items-center space-x-3">
                            {user.id !== user.auth ? renderFriendButton()
                                : (
                                    <div className="flex items-center space-x-3">
                                        <FaLinkedin size={28} className="text-blue-400 hover:scale-110 transition cursor-pointer" />
                                        <FaSquareFacebook size={28} className="text-blue-600 hover:scale-110 transition cursor-pointer" />
                                        <IoLogoYoutube size={28} className="text-red-600 hover:scale-110 transition cursor-pointer" />
                                        <FaSquareGithub size={28} className="text-violet-400 hover:scale-110 transition cursor-pointer" />
                                    </div>
                                )}
                        </div>
                    </div>
                    {/*Content */}
                    <div className="max-w-3xl w-full dark:text-gray-50 mx-auto space-y-3">
                        {/*People U May Know */}
                        {user.auth === user.id && notFriends?.length > 0 && (
                            <div className="dark:bg-slate-700 p-3 rounded-md">
                                <div className="flex flex-col space-x-3 border border-gray-500 p-2 rounded-lg w-full">
                                    <div className='flex items-center justify-between space-x-2'>
                                        <h3 className="text-lg font-semibold dark:text-gray-50 p-1">
                                            People You May Know
                                        </h3>
                                        <div className="p-1 hover:no-underline underline cursor-pointer opacity-50 hover:opacity-100">
                                            <Link href={route("friends.index")}>see all</Link>
                                        </div>
                                    </div>
                                    <div className="max-w-full overflow-hidden">
                                        <FriendsCarousel notFriends={notFriends} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/*User Info */}
                        <div className="p-6 bg-gray-700 rounded-md shadow-lg space-y-6 mb-3">
                            <div className="flex items-center justify-between mx-2">
                                <h2 className="text-2xl font-semibold text-white">Information</h2>
                                {user.auth === user.id && (
                                    <Link
                                        href={route("users.edit", user.id)}
                                        className="inline-block underline opacity-75 hover:no-underline"
                                    >
                                        Edit Details
                                    </Link>
                                )}
                            </div>
                            <UserInfo user={user} />
                        </div>
                        {/*Posts */}
                        <div>
                            {user.posts.length > 0 ? (
                                user.posts.map((post) => (
                                    <div key={post.id} className="p-6 bg-gray-700 rounded-md shadow-lg my-3">
                                        <div className="flex flex-col space-y-3">
                                            <div>
                                                <div className="flex items-center mb-2 space-x-2">
                                                    <img
                                                        src={user.profile_pic || "/default-avatar.png"}
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
                                                    <FcLike /> <p>React</p>
                                                </button>
                                                <button className="flex items-center space-x-2 opacity-75 hover:bg-slate-400 rounded px-3 py-2">
                                                    <FaCommentDots /> <p>Comment</p>
                                                </button>
                                                <button className="flex items-center space-x-2 opacity-75 hover:bg-slate-400 rounded px-5 py-2">
                                                    <FaShare /> <p>Share</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex items-center justify-center text-xl font-bold'>No posts available</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Show
