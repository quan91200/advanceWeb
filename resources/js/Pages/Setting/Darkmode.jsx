import Button from '@/Components/Button'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft } from "react-icons/md"
import { useTranslation } from 'react-i18next'

const Darkmode = () => {
    const { t } = useTranslation()
    const { auth } = usePage().props
    const userDarkMode = auth?.user?.dark_mode || 'light'

    // State tạm thời lưu theme để cập nhật UI ngay lập tức
    const [theme, setTheme] = useState(userDarkMode)

    useEffect(() => {
        // Khi theme thay đổi, cập nhật class trên <html>
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const updateDarkMode = (mode) => {
        if (theme !== mode) {
            setTheme(mode) // Cập nhật state ngay để giao diện thay đổi ngay lập tức

            router.post(route('users.updateDarkmode'), { dark_mode: mode }, {
                preserveScroll: true,
            })
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center space-x-2'>
                    <Link href={route('users.settings')}>
                        <Button variant='outlineInfo' size='circle' className='border-none flex items-center justify-center'>
                            <MdChevronLeft size={28} />
                        </Button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">{t('button.dark')}</h2>
                </div>
            }
        >
            <Head title={t('button.dark')} />
            <div className='max-w-3xl mx-auto'>
                <div className='p-3 dark:bg-gray-800 bg-gray-200 my-5 dark:text-gray-300'>
                    <div className='border-b-2 dark:border-gray-700 border-gray-400 mx-4 py-4'>
                        <div className='flex flex-col items-start border dark:border-gray-700 border-gray-400 p-4 rounded space-y-3'>
                            <h2 className='font-bold text-xl dark:text-blue-400 text-blue-600'>{t('button.dark')}</h2>
                            <div className='w-full space-y-2'>
                                {['dark', 'light'].map((mode) => (
                                    <div
                                        key={mode}
                                        className={`flex items-center space-x-2 my-2 rounded p-4 cursor-pointer 
                                            dark:hover:bg-gray-900 hover:bg-gray-300 transition-all duration-300
                                            ${theme === mode ? 'bg-blue-600 text-white' : 'dark:bg-gray-800 bg-gray-200'}`}
                                        onClick={() => updateDarkMode(mode)}
                                    >
                                        <h4 className='capitalize'>{mode === 'dark' ? t('button.dark') : t('button.light')}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Darkmode