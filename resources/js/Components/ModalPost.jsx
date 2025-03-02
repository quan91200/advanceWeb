import React, { useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { FcLike } from "react-icons/fc"
import { FaCommentDots } from "react-icons/fa"
import { FaShare } from "react-icons/fa"
import ApplicationLogo from '@/Components/ApplicationLogo'
import Modal from '@/Components/Modal'
import { IoMdClose } from "react-icons/io"

const ModalPost = ({ post, showModal, setShowModal }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setShowModal(false)
            }
        }
        if (showModal) {
            window.addEventListener("keydown", handleKeyDown)
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [showModal, setShowModal])
    return (
        <Modal show={showModal}>
            <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-900 rounded-lg overflow-hidden relative w-full mx-auto">
                <div className='absolute top-3 left-3 z-10 flex items-center space-x-2'>
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-black text-white dark:bg-gray-800 dark:text-gray-100 p-3 rounded-full flex items-center justify-center hover:opacity-100 opacity-75"
                    >
                        <IoMdClose size={20} />
                    </button>
                    <ApplicationLogo className="h-10 w-10 fill-current text-blue-500 dark:text-blue-600" title="CobhamSocial" />
                </div>
                <div className="w-full lg:w-2/3 bg-black flex items-center justify-center">
                    <div>
                        <img
                            src={post.image_url ? post.image_url : 'dark:bg-gray-950 bg-gray-200'}
                            alt="Post Image"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col p-4 overflow-auto">
                    <div className="flex items-center mb-4">
                        <img
                            src={post.user.profile_pic}
                            alt="User Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-3">
                            <Link href={route('users.show', { id: post.user.id })}>
                                <p className="font-bold text-lg hover:underline">{post.user.name}</p>
                            </Link>
                            <p className="text-sm dark:text-gray-400">{post.created_at}</p>
                        </div>
                    </div>
                    <div className="overflow-y-auto mb-4">
                        <p className="text-base dark:text-gray-100">{post.content}</p>
                    </div>
                    <div className="border-y border-gray-300 dark:border-gray-700 p-2">
                        <div className="flex items-center justify-around dark:text-gray-100">
                            <button className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1">
                                <FcLike /> <p>React</p>
                            </button>
                            <button className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1">
                                <FaCommentDots /> <p>Comment</p>
                            </button>
                            <button className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1">
                                <FaShare /> <p>Share</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalPost
