import { Link } from '@inertiajs/react'
import React, { useState } from 'react'
import ModalPost from '@/Components/ModalPost'
import { FaCommentDots } from "react-icons/fa"
import { FcLike } from "react-icons/fc"
import { FaShare } from "react-icons/fa"

const Modern = ({ post }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={post.user.profile_pic}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-blue-500 dark:border-blue-600 object-cover"
                />
                <div>
                    <Link href={route('users.show', { id: post.user.id })}>
                        <h3 className="text-xl font-bold hover:underline text-gray-800 dark:text-gray-200">
                            {post.user.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{post.created_at} • {post.status}</p>
                </div>
            </div>
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                {post.content}
            </h2>
            {post.image_url && (
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={post.image_url}
                        alt="Post"
                        className="w-full h-96 object-cover hover:opacity-75 cursor-pointer"
                        onClick={() => setShowModal(true)}
                    />
                </div>
            )}
            <div className="flex space-x-4 justify-between mt-4">
                <button className="px-4 py-2 text-white rounded-lg flex items-center space-x-1">
                    <FcLike /> <p>React</p>
                </button>
                <div className='flex items-center space-x-2'>
                    <button className="px-4 py-2 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 flex items-center space-x-1">
                        <FaCommentDots /> <p>Comment</p>
                    </button>
                    <button className="px-4 py-2 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 flex items-center space-x-1">
                        <FaShare /> <p>Share</p>
                    </button>
                </div>
            </div>
            <ModalPost post={post} showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default Modern