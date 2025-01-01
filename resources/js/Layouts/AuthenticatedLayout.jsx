import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import { Link, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user

    const [t, i18n] = useTranslation("global")
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    const handleLanguage = (lang) => {
        i18n.changeLanguage(lang)
        setCurrentLanguage(lang)
        alert(t('alert.text'))
    }

    useEffect(() => {
        setCurrentLanguage(i18n.language)
    }, [i18n.language])

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
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
                                    {t("base.dashboard")}
                                </NavLink>
                                <NavLink
                                    href={route('posts.index')}
                                    active={route().current('posts.index')}
                                >
                                    {t("base.post")}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className='flex gap-1 p-1'>
                                <button
                                    onClick={() => handleLanguage('en')}
                                    className={currentLanguage === 'en' ? 'dark:text-white' : ''}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => handleLanguage('vn')}
                                    className={currentLanguage === 'vn' ? 'dark:text-white' : ''}
                                >
                                    VN
                                </button>
                            </div>
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex gap-2 items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
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
                                            href={route('profile.edit')}
                                        >
                                            {t("base.profile")}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            {t("base.logout")}
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

            <main>{children}</main>
        </div>
    )
}
