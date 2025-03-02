import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { BsPersonVcard } from "react-icons/bs"
import { MdSecurity } from "react-icons/md"
import { MdOutlineVerified } from "react-icons/md"

import { GrLanguage } from "react-icons/gr"
import { CiDark } from "react-icons/ci"
import { MdOutlineEmojiEmotions } from "react-icons/md"
import { FaUserMinus } from "react-icons/fa"

import { GrServicePlay } from "react-icons/gr"
import { RiUserCommunityLine } from "react-icons/ri"
import { MdOutlinePolicy } from "react-icons/md"
import { TbPremiumRights } from "react-icons/tb"
import Project from '@/Components/Project'

const Setting = () => {
    const { t } = useTranslation()
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">
                    {t('button.setting')}
                </h2>
            }
            footer={
                <Project />
            }
        >
            <Head title={t('button.setting')} />
            <div className='max-w-3xl mx-auto'>
                <div className='p-3 dark:bg-gray-800 bg-gray-200 dark:text-gray-300 my-5'>
                    {/**Account Center */}
                    <div className='border-b-2 border-gray-300 mx-4 py-4'>
                        <Link
                            href={route('users.settings.accountCenter')}
                            className='flex flex-col items-start border border-gray-300 p-4 rounded space-y-3 cursor-pointer group 
                                        dark:hover:bg-gray-800 hover:bg-gray-300 transition-all duration-300'
                        >
                            <h2 className='font-bold text-xl dark:group-hover:text-blue-600 group-hover:text-blue-500'>{t('title.accountCenter')}</h2>
                            <div className='p-4 dark:bg-gray-600 bg-gray-300 w-full my-2 rounded space-y-2'>
                                <div className='flex items-center space-x-2'>
                                    <BsPersonVcard />
                                    <h4 className='capitalize'>{t('title.personal')}</h4>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <MdSecurity />
                                    <h4 className='capitalize'>{t('title.security')}</h4>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <MdOutlineVerified />
                                    <h4 className='capitalize'>{t('title.verify')}</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/**Options */}
                    <div className='border-b-2 border-gray-300 mx-4 py-4'>
                        <div className='flex flex-col items-start p-4 space-y-3'>
                            <h2 className='font-bold text-xl'>{t('title.options')}</h2>
                            <div className='space-y-1 w-full'>
                                <Link href={route('users.language')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <GrLanguage />
                                    <h4 className='capitalize'>{t('title.language')}</h4>
                                </Link>
                                <Link href={route('users.darkmode')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <CiDark />
                                    <h4 className='capitalize'>{t('button.dark')}</h4>
                                </Link>
                                <Link href={route('users.emotion')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <MdOutlineEmojiEmotions />
                                    <h4 className='capitalize'>{t('title.emotions')}</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/**Object */}
                    <div className='border-b-2 border-gray-300 mx-4 py-4'>
                        <div className='flex flex-col items-start p-4 space-y-3'>
                            <h2 className='font-bold text-xl'>{t('title.object')}</h2>
                            <div className='space-y-1 w-full'>
                                <Link href={route('users.block')} className='flex items-center space-x-2 px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <FaUserMinus />
                                    <h4 className='capitalize'>{t('title.block')}</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-3 dark:bg-gray-800 bg-gray-200 dark:text-gray-300'>

                    {/**Premium */}
                    <div className='border-b-2 border-gray-300 mx-4 py-4'>
                        <div className='flex flex-col items-start p-4 space-y-3'>
                            <h2 className='font-bold text-xl'>{t('title.premium')}</h2>
                            <div className='space-y-1 w-full'>
                                <Link href={route('users.price')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <TbPremiumRights />
                                    <h4 className='capitalize'>{t('title.premium')}</h4>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='p-3 dark:bg-gray-800 bg-gray-200 dark:text-gray-300'>

                    {/**Community Standards and Legal Policy */}
                    <div className='border-b-2 border-gray-300 mx-4 py-4'>
                        <div className='flex flex-col items-start p-4 space-y-3'>
                            <h2 className='font-bold text-xl'>{t('title.comAndPolicy')}</h2>
                            <div className='space-y-1 w-full'>
                                <a target='_blank' rel='noreferrer' href={route('users.terms')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <GrServicePlay />
                                    <h4 className='capitalize'>{t('title.terms')}</h4>
                                </a>
                                <a target='_blank' rel='noreferrer' href={route('users.community')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <RiUserCommunityLine />
                                    <h4 className='capitalize'>{t('title.community')}</h4>
                                </a>
                                <a target='_blank' rel='noreferrer' href={route('users.privacy')} className='flex items-center space-x-2 w-full px-3 py-2 rounded-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300'>
                                    <MdOutlinePolicy />
                                    <h4 className='capitalize'>{t('title.privacy')}</h4>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Setting