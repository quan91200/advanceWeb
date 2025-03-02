import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import Dropdown from '@/Components/Dropdown'
import { TiTick } from "react-icons/ti"
import { AiTwotoneDelete } from "react-icons/ai"
import { CiSettings } from "react-icons/ci"
import { useTranslation } from 'react-i18next'

const Notification = () => {
    const { t } = useTranslation()
    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto pt-16">
                <div className="p-6 dark:bg-gray-800 bg-gray-300 my-5 dark:text-gray-300 text-center rounded-lg">
                    <div className='flex items-center justify-between space-x-2'>
                        <h2 className="text-2xl font-semibold">{t('title.notification')}</h2>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <HiOutlineDotsHorizontal size={25} className='cursor-pointer' />
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link className='flex items-center space-x-1'> <TiTick /><span>{t('notification.mark')}</span></Dropdown.Link>
                                <Dropdown.Link className='flex items-center space-x-1'><AiTwotoneDelete /> <span>{t('notification.clear')}</span></Dropdown.Link>
                                <Dropdown.Link className='flex items-center space-x-1'><CiSettings /> <span>{t('notification.noti')}</span></Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className='flex space-x-1 items-center my-2'>
                        <span className='bg-blue-600 rounded-xl p-2 text-blue-200'>{t('notification.noti')}</span>
                        <span className='rounded-xl p-1'>{t('notification.all')}</span>
                    </div>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {t('notification.unread')}
                    </p>
                    <div className="mt-4">
                        <Link href={route('dashboard')} className="text-blue-500 hover:underline">
                            {t('notification.noNoti')}
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Notification