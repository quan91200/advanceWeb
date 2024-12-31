import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'


export default function Dashboard() {
    const [t, i18n] = useTranslation("global")
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight dark:text-white">
                    {t('base.dashboard')}
                </h2>
            }
        >
            <Head title={t('base.dashboard')} />
            Hello World
        </AuthenticatedLayout>
    )
}