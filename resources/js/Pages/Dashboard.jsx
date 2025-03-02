import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa"
import Button from '@/Components/Button'
import Project from '@/Components/Project'

import { RxDashboard } from "react-icons/rx"
import { BsFilePost } from "react-icons/bs"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { IoIosNotificationsOutline } from "react-icons/io"
import ApplicationLogo from '@/Components/ApplicationLogo'

import { useTranslation } from 'react-i18next'
import Footer from '@/Components/Footer'

export default function Dashboard({ userCurrent }) {
    const { t } = useTranslation()
    const [gradient, setGradient] = useState("linear-gradient(135deg, #3B82F6, #9333EA)")

    useEffect(() => {
        const interval = setInterval(() => {
            setGradient(
                `linear-gradient(135deg, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`
            )
        }, 3000) // Thay đổi màu mỗi 3 giây

        return () => clearInterval(interval) // Dọn dẹp interval khi component unmount
    }, [])
    return (
        <AuthenticatedLayout
            footer={
                <Footer />
            }
        >
            <Head title={t('title.dashboard')} />

            <div className="py-14">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="dark:bg-gray-800 border border-gray-700 rounded-lg shadow-lg bg-white dark:border-gray-900 my-5 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden mx-auto">
                        {/* Cột trái - Ảnh & Thông tin cá nhân */}
                        <div
                            className="w-full md:w-1/3 p-6 flex flex-col items-center text-center dark:bg-gray-900"
                            style={{ background: "linear-gradient(135deg, #1E3A8A, #6D28D9)" }} // Xanh đậm -> tím
                        >
                            {/* Ảnh đại diện */}
                            <div className="relative h-32 w-32 flex justify-center items-center my-4">
                                {/* Lớp bóng với gradient động */}
                                <div
                                    className="absolute w-full h-full clip-hexagon shadow-lg scale-105 transition-all duration-1000"
                                    style={{ background: gradient }}
                                ></div>

                                {/* Ảnh đại diện */}
                                <div
                                    className="relative w-full h-full clip-hexagon overflow-hidden border-gray-700"
                                >
                                    <img
                                        alt="Profile Pic"
                                        src={userCurrent.profile_pic}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Tên & chức vụ */}
                            <h2 className="font-bold text-2xl text-white hover:underline">
                                <Link href={route('users.show', userCurrent.id)}>
                                    {userCurrent.name}
                                </Link>
                            </h2>
                            <p className="text-gray-200 text-lg">{userCurrent.profile.job}</p>

                            {/* Thông tin cá nhân */}
                            <div className="mt-5 text-gray-300 text-left w-full">
                                <h3 className="text-lg font-semibold text-gray-100 border-b pb-1 mb-3">{t('title.contactInfor')}</h3>
                                <p>📧 {userCurrent.email}</p>
                                <p>📞 {userCurrent.profile.phone_number}</p>
                                <p>📅 {userCurrent.profile.dob}</p>
                                <p>💼 {userCurrent.profile.relationship}</p>
                            </div>
                        </div>

                        {/* Cột phải - Kinh nghiệm & Kỹ năng */}
                        <div className="w-full md:w-2/3 p-6 dark:text-gray-300">
                            {/* Giới thiệu */}
                            <div className='mb-3'>
                                <h3 className="text-xl font-semibold dark:text-gray-100 border-b pb-1 mb-3">{t('title.bio')}</h3>
                                <p>{userCurrent.profile.bio || 'No bio yet.'}</p>
                            </div>
                            {/* Kinh nghiệm - Bài viết gần đây */}
                            <div className="mb-3">
                                <h3 className="text-xl font-semibold dark:text-gray-100 border-b pb-1 mb-3">{t('title.recentPost')}</h3>
                                {userCurrent.posts.length > 0 ? (
                                    userCurrent.posts.slice(0, 3).map((post, index) => (
                                        <p key={index} className="truncate">📝 {post.content}</p>
                                    ))
                                ) : (
                                    <p>{t('desc.noPost')}</p>
                                )}
                            </div>

                            {/* Kỹ năng & Sở thích */}
                            <div className="mb-3">
                                <h3 className="text-xl font-semibold dark:text-gray-100 border-b pb-1 mb-3">{t('title.skillinter')}</h3>
                                <ul className="list-disc list-inside">
                                    {userCurrent.hobbies.length > 0 ? (
                                        userCurrent.hobbies.map((hobby, index) => (
                                            <li key={index}>{hobby.name}</li>
                                        ))
                                    ) : (
                                        <p>{t('desc.noHobbies')}</p>
                                    )}
                                </ul>
                            </div>

                            {/* Footer - Mạng xã hội */}
                            <div className="w-full py-4 text-white text-center flex flex-col items-center"
                                style={{ background: "linear-gradient(135deg, #064E3B, #047857)" }}> {/* Xanh lá đậm -> xanh ngọc */}
                                <p className="mb-2">{t('title.connectWithMeOn')}</p>

                                {/* Icon mạng xã hội */}
                                <div className="flex space-x-4 animate-pulse transition-all">
                                    <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer"
                                        className="text-white text-2xl hover:text-gray-300 transition-all">
                                        <FaGithub />
                                    </a>
                                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
                                        className="text-white text-2xl hover:text-gray-300 transition-all">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"
                                        className="text-white text-2xl hover:text-gray-300 transition-all">
                                        <FaFacebook />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-6 space-x-2'>
                        <Button variant='info'>
                            <Link href={route('posts.create')}>
                                {t('button.create')}
                            </Link>
                        </Button>
                        <Button variant='primary'>
                            <Link href={route('posts.trash')}>
                                {t('button.trash')}
                            </Link>
                        </Button>
                    </div>
                    <div className='flex items-center justify-center my-10'>
                        <ApplicationLogo className="block h-20 w-auto fill-current text-blue-500 dark:text-blue-600 animate-bounce" title="CobhamSocial" />
                    </div>
                    <div className='flex items-center justify-center my-6 flex-col space-y-4'>
                        <div className='flex items-center justify-center space-x-4'>
                            <div className='flex flex-col items-center justify-center h-32 w-32 space-y-1 dark:bg-blue-600 bg-blue-500 rounded text-gray-200 font-semibold'>
                                <RxDashboard size={25} />
                                <p>{t('title.dashboard')}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center h-32 w-32 space-y-1 dark:bg-blue-600 bg-blue-500 rounded text-gray-200 font-semibold'>
                                <BsFilePost size={25} />
                                <p>{t('title.post')}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center h-32 w-32 space-y-1 dark:bg-blue-600 bg-blue-500 rounded text-gray-200 font-semibold'>
                                <LiaUserFriendsSolid size={25} />
                                <p>{t('title.friend')}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center h-32 w-32 space-y-1 dark:bg-blue-600 bg-blue-500 rounded text-gray-200 font-semibold'>
                                <HiOutlineUserGroup size={25} />
                                <p>{t('title.group')}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center h-32 w-32 space-y-1 dark:bg-blue-600 bg-blue-500 rounded text-gray-200 font-semibold'>
                                <IoIosNotificationsOutline size={25} />
                                <p>{t('title.notification')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-16'>
                        <Project />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
