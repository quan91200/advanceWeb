import Footer from '@/Components/Footer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Groups = () => {
    const { t } = useTranslation()
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">{t('title.group')}</h2>}
            footer={<Footer />}
        >
            <Head title={t('title.group')} />
            <div className="max-w-3xl mx-auto">
                <div className="p-6 dark:bg-gray-800 bg-gray-300 my-5 dark:text-gray-300 text-center rounded-lg">
                    <h2 className="text-2xl font-semibold">🚧 {t('title.developing')}...</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {t('desc.developing')}
                    </p>
                    <div className="mt-4">
                        <Link href={route('dashboard')} className="text-blue-500 hover:underline">
                            {t('button.backToDashboard')}
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Groups