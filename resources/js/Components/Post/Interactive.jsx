import React, { useState, useRef, useEffect } from 'react'
import { Link, router } from '@inertiajs/react'
import Dropdown from '@/Components/Dropdown'
import { MdMoreHoriz } from "react-icons/md"
import ModalPost from '@/Components/ModalPost'
import { FcLike } from "react-icons/fc"
import { FaCommentDots } from "react-icons/fa"
import { FaShare } from "react-icons/fa"
import { useTranslation } from 'react-i18next'

const Interactive = ({ post }) => {
    const { t } = useTranslation()
    const [isExpanded, setIsExpanded] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const contentRef = useRef(null)
    const image = post.image_url || 'dark:bg-gray-700 bg-gray-50'
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (contentRef.current) {
            const isContentClamped = contentRef.current.scrollHeight > contentRef.current.clientHeight
            setIsClamped(isContentClamped)
        }
    }, [post.content])

    const toggleContent = () => {
        setIsExpanded(!isExpanded)
    }

    function deletePost(id) {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("posts.destroy", id), {
                onSuccess: () => alert("Post deleted successfully"),
            })
        }
    }

    return (
        <div className="relative bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden my-5">
            <div
                className="w-full h-[500px] bg-cover bg-center bg-blend-lighten hover:opacity-75 cursor-pointer"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setShowModal(true)}
            >
                <div className="absolute top-0 left-0 w-full text-white" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between space-x-3 bg-gradient-to-b from-black to-transparent p-3">
                        <div className="flex items-center mb-2 space-x-2">
                            <img
                                src={post.user.profile_pic}
                                alt="User Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <Link href={route('users.show', { id: post.user.id })}>
                                    <p className="font-bold text-lg hover:underline">{post.user.name}</p>
                                </Link>
                                <p className="text-sm">{post.created_at}</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2 opacity-70'>
                            <span className="capitalize text-sm font-bold hover:scale-105">{post.status}</span>
                            <span>|</span>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <MdMoreHoriz className='hover:opacity-75 opacity-100 hover:scale-125' />
                                </Dropdown.Trigger>
                                <Dropdown.Content align='right'>
                                    {post.user.id === post.user.auth ? (
                                        <>
                                            <Dropdown.Link href={route('posts.edit', { id: post.user.id })}>{t('button.edit')}</Dropdown.Link>
                                            <Dropdown.Link onClick={() => deletePost(post.id)}>{t('button.delete')}</Dropdown.Link>
                                        </>
                                    ) : (
                                        <>
                                            <Dropdown.Link>{t('button.report')}</Dropdown.Link>
                                            <Dropdown.Link>{t('button.hide')}</Dropdown.Link>
                                        </>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 absolute bottom-0 left-0 bg-gradient-to-t dark:from-gray-900 from-gray-500 w-full to-transparent">
                <div
                    ref={contentRef}
                    className={`text-xl font-semibold dark:text-gray-300 text-gray-200 dark:bg-[rgba(255, 255, 255, .5)] ${!isExpanded ? 'line-clamp-2' : ''}`}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: isExpanded ? 'unset' : 2,
                        overflow: isExpanded ? 'visible' : 'hidden',
                    }}
                >
                    {post.content}
                </div>
                <div className='flex items-center justify-between'>
                    <div className="flex space-x-4 mt-4 dark:text-gray-600 text-gray-100">
                        <button className="flex items-center space-x-1">
                            <FcLike /> <p>{t('button.react')}</p>
                        </button>
                        <button className="flex items-center space-x-1">
                            <FaCommentDots /> <p>{t('button.comment')}</p>
                        </button>
                        <button className="flex items-center space-x-1">
                            <FaShare /> <p>{t('button.share')}</p>
                        </button>
                    </div>
                    {isClamped && !isExpanded && (
                        <button
                            className="text-blue-500 mt-2 hover:underline"
                            onClick={toggleContent}
                        >
                            ...Xem thêm
                        </button>
                    )}
                    {isExpanded && (
                        <button
                            className="text-blue-500 mt-2 hover:underline"
                            onClick={toggleContent}
                        >
                            Thu gọn
                        </button>
                    )}
                </div>
            </div>
            <ModalPost post={post} showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default Interactive