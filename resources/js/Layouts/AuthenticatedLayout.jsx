import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import { Link, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { IoIosLogOut } from "react-icons/io"
import { FiUser } from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5"

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user
    const [t] = useTranslation("global")
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 shadow-md dark:bg-gray-800 fixed top-0 overflow-visible w-full z-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    {t("dashboard")}
                                </NavLink>
                                <NavLink
                                    href={route('posts.index')}
                                    active={route().current('posts.index')}
                                >
                                    {t("post.index.title")}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex gap-2 items-center rounded-md border border-transparent px-3 py-2 
                                                text-sm font-medium leading-4 text-gray-800 transition duration-150 ease-in-out hover:text-gray-500 
                                                focus:outline-none dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}
                                                <div className='h-8 w-8'>
                                                    <img
                                                        alt='avt'
                                                        src={user.profile_pic ? `/storage/${user.profile_pic}` : '/images/default.png'}
                                                        className='object-cover w-full h-full rounded-full border-2 border-blue-500'
                                                    />
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('user.show', user.id)}
                                            className='flex items-center gap-1 group'
                                        >
                                            <FiUser className='group-hover:scale-125' />
                                            {t("profile.title")}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('user.index')}
                                            className='flex items-center gap-1 group'
                                        >
                                            <IoSettingsOutline className='group-hover:scale-125' />
                                            {t("button.setting")}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            className='flex items-center gap-1 group'
                                        >
                                            <IoIosLogOut className='group-hover:scale-125' />
                                            {t("button.logout")}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className='pt-16'>{children}</main>
        </div>
    )
}
