import Button from '@/Components/Button'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage, router } from '@inertiajs/react'
import React from 'react'
import { MdChevronLeft } from "react-icons/md"
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

const Language = () => {
    const { t } = useTranslation()
    const { language } = usePage().props
    console.log(language)
    const updateLanguage = (lang) => {
        if (language !== lang) {
            router.post(route('users.updateLang'), { language: lang }, {
                preserveScroll: true,
                onSuccess: () => {
                    i18n.changeLanguage(lang)
                    window.location.reload() // Reload trang để cập nhật language từ backend
                }
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
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">{t('title.language')}</h2>
                </div>
            }
        >
            <Head title={t('title.language')} />
            <div className='max-w-3xl mx-auto'>
                <div className='p-3 dark:bg-gray-800 bg-gray-200 my-5 dark:text-gray-300'>
                    <div className='border-b-2 border-gray-700 mx-4 py-4'>
                        <div className='flex flex-col items-start border border-gray-700 p-4 rounded space-y-3'>
                            <h2 className='font-bold text-xl dark:text-blue-400 text-blue-600'>{t('title.language')}</h2>
                            <div className='w-full space-y-2'>
                                {['en', 'vi'].map((lang) => (
                                    <div
                                        key={lang}
                                        className={`flex items-center space-x-2 my-2 rounded p-4 cursor-pointer 
                                            dark:hover:bg-gray-900 hover:bg-gray-300 transition-all duration-300
                                            ${language === lang ? 'bg-blue-600 text-white' : 'dark:bg-gray-800 bg-gray-200'}`}
                                        onClick={() => updateLanguage(lang)}
                                    >
                                        <h4 className='capitalize'>{lang === 'en' ? t('button.en') : t('button.vi')}</h4>
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

export default Language