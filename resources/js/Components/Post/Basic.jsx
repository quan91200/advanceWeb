import { Link } from '@inertiajs/react'
import React, { useState } from 'react'
import ModalPost from '@/Components/ModalPost'

const Basic = ({ post }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="bg-white shadow-md dark:bg-gray-800 rounded-lg p-4 my-4 dark:text-gray-50">
            <div className="flex items-center mb-4">
                <img
                    src={post.user.profile_pic}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 dark:border-blue-600"
                />
                <div className="ml-3">
                    <Link href={route('users.show', { id: post.user.id })}>
                        <h3 className="font-bold text-lg hover:underline">
                            {post.user.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-500">
                        {post.created_at} • {post.status}
                    </p>
                </div>
            </div>
            <p className="text-gray-800 dark:text-gray-300 mb-4">{post.content}</p>
            {post.image_url && (
                <img
                    src={post.image_url}
                    alt="Post"
                    className="w-full rounded-lg h-96 object-contain hover:opacity-75 cursor-pointer"
                    onClick={() => setShowModal(true)}
                />
            )}
            <ModalPost post={post} showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default Basic