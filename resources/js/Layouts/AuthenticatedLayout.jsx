import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavItem from '@/Components/NavItem'
import Button from '@/Components/Button'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosNotificationsOutline } from "react-icons/io"
import { CiMail } from "react-icons/ci"
import { RxDashboard } from "react-icons/rx"
import { BsFilePost } from "react-icons/bs"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { HiOutlineUserGroup } from "react-icons/hi2"

import { HiOutlineDotsHorizontal } from "react-icons/hi"

export default function AuthenticatedLayout({ header, children, footer }) {
    const { t } = useTranslation()
    const auth = usePage().props.auth.user
    const { url } = usePage()
    const isActive = route().current('users.notification')
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false)
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 fixed top-0 w-full z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-xl">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-blue-500 dark:text-blue-600" title="CobhamSocial" />
                                </Link>
                            </div>


                        </div>
                        <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex">
                            <NavItem href={route("dashboard")} icon={RxDashboard} active={route().current("dashboard")} />
                            <NavItem href={route("posts.index")} icon={BsFilePost} active={route().current("posts.index")} />
                            <NavItem href={route("friends.index")} icon={LiaUserFriendsSolid} active={route().current("friends.index")} />
                            <NavItem href={route("groups.index")} icon={HiOutlineUserGroup} active={route().current("groups.index")} />
                        </div>
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative flex items-center space-x-3">
                                <div className='h-8 w-8 flex items-center justify-center dark:text-gray-500 dark:hover:text-gray-300 rounded cursor-pointer'>
                                    <CiMail size={25} />
                                </div>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div
                                            className={`h-8 w-8 flex items-center justify-center rounded cursor-pointer 
                                                ${isActive ? 'text-blue-600' : 'dark:text-gray-500 dark:hover:text-gray-300'}`}
                                        >
                                            <IoIosNotificationsOutline size={25} />
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div className='dark:text-gray-300 px-3 py-1'>
                                            <div className='flex items-start justify-between space-x-2'>
                                                <div>
                                                    <h4 className='text-[18px]'>{t('title.notification')}</h4>
                                                    <div className='flex space-x-1 items-center'>
                                                        <span className='bg-blue-600 rounded-xl p-1 text-xs text-blue-200'>{t('notification.all')}</span>
                                                        <span className='rounded-xl p-1 text-xs'>{t('notification.unread')}</span>
                                                    </div>
                                                </div>
                                                <div className='cursor-pointer mt-1'><HiOutlineDotsHorizontal size={20} /></div>
                                            </div>
                                            <div className=' text-sm py-2'>{t('notification.noNoti')}</div>
                                            <Link href={route('users.notification')}>
                                                <Button variant='info' className='w-full' size='small'>
                                                    {t('button.seeAll')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex">
                                            <button
                                                type="button"
                                                className="transition duration-150 ease-in-out"
                                            >
                                                <div className='h-10 w-10'>
                                                    <img
                                                        alt='avt'
                                                        src={
                                                            auth.profile_pic ? `/storage/${auth.profile_pic}`
                                                                : null
                                                        }
                                                        className='
                                                            object-cover w-full h-full rounded-full border-2 
                                                            border-blue-500'
                                                    />
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('users.show', auth.id)}>
                                            <div className='flex items-center space-x-2 py-3 border-b border-gray-200'>
                                                <div className='h-10 w-10'>
                                                    <img
                                                        alt='avt'
                                                        src={
                                                            auth.profile_pic ? `/storage/${auth.profile_pic}`
                                                                : null
                                                        }
                                                        className='
                                                            object-cover w-full h-full rounded-full border-2 
                                                            border-blue-500'
                                                    />
                                                </div>
                                                <div className='text-sm text-nowrap'>{auth.name}</div>
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('users.settings')}
                                        >
                                            {t('button.setting')}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            {t('button.logout')}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 
                                         text-gray-400 transition duration-150 ease-in-out 
                                         hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 
                                         focus:text-gray-500 focus:outline-none dark:text-gray-500 
                                         dark:hover:bg-gray-900 dark:hover:text-gray-400 
                                         dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            {t('title.dashboard')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {auth.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {auth.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                {t('button.logout')}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800 mt-16">
                    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className='py-6'>{children}</main>
            {footer && (
                <footer className='w-full bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700'>
                    {footer}
                </footer>
            )}

        </div>
    )
}
