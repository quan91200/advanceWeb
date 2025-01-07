import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import Toast from '@/Components/Toast'
import { FaRegUserCircle } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdOutlineVerifiedUser } from "react-icons/md"
import Button from '@/Components/Button'

export default function Index({ dark_mode, language }) {
    const [t, i18n] = useTranslation("global")
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [darkMode, setDarkMode] = useState(dark_mode || false)

    const enableDarkMode = () => {
        setDarkMode(true)
        setToastMessage(t('toast.dark'))
        setToastOpen(true)
    }

    const disableDarkMode = () => {
        setDarkMode(false)
        setToastMessage(t('toast.light'))
        setToastOpen(true)
    }

    const handleLanguage = (lang) => {
        i18n.changeLanguage(lang)
        setCurrentLanguage(lang)
        setToastMessage(t('toast.lang'))
        setToastOpen(true)
    }

    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language)
        }
    }, [language, i18n])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])
    return (
        <AuthenticatedLayout>
            <Head title={t('button.setting')} />
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href={route("profile.edit")}
                            className="p-5 dark:bg-gray-800 bg-white rounded-md shadow-md"
                        >
                            <h2 className="text-xl font-semibold dark:text-gray-100 text-gray-800">{t('setting.account')}</h2>
                            <div className="flex flex-col items-start gap-2 mt-4 dark:text-gray-300 dark:bg-gray-700 p-5 rounded-md bg-gray-100">
                                <div className='flex items-center space-x-2'>
                                    <FaRegUserCircle />
                                    <h2>{t('setting.details')}</h2>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RiLockPasswordFill />
                                    <h2>{t('setting.security')}</h2>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <MdOutlineVerifiedUser />
                                    <h2>{t('setting.verifi')}</h2>
                                </div>
                            </div>
                        </Link>
                        <div className="p-5 dark:bg-gray-800 bg-white rounded-md shadow-md">
                            <h2 className="text-xl font-semibold dark:text-gray-100 text-gray-800">{t('button.language')}</h2>
                            <div className="flex gap-4 mt-4">
                                <Button
                                    onClick={() => handleLanguage('en')}
                                    variant={currentLanguage === 'en' ? 'info' : 'outlineSecondary'}
                                >
                                    EN
                                </Button>
                                <Button
                                    onClick={() => handleLanguage('vn')}
                                    variant={currentLanguage === 'vn' ? 'info' : 'outlineSecondary'}
                                >
                                    VN
                                </Button>
                            </div>
                        </div>
                        <div className="p-5 dark:bg-gray-800 bg-white rounded-md shadow-md dark:text-gray-100 text-gray-800">
                            <h2 className="text-xl font-semibold mb-5">{t('setting.mode')}</h2>
                            <label className="flex items-center justify-between dark:hover:bg-gray-700 hover:bg-slate-100 rounded-md p-4">
                                <span>{t('mode.dark')}</span>
                                <input
                                    type="radio"
                                    name="theme"
                                    checked={darkMode}
                                    onChange={enableDarkMode}
                                    className="mr-2"
                                />
                            </label>
                            <label className="flex items-center justify-between dark:hover:bg-gray-700 hover:bg-slate-100 rounded-md p-4">
                                <span>{t('mode.light')}</span>
                                <input
                                    type="radio"
                                    name="theme"
                                    checked={!darkMode}
                                    onChange={disableDarkMode}
                                    className="mr-2"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                open={toastOpen}
                onClose={() => setToastOpen(false)}
                message={toastMessage}
                type="success"
                pos="bottom-left"
                duration={2000}
            />
        </AuthenticatedLayout>
    )
}