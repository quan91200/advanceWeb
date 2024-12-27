import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const [t, i18n] = useTranslation("global")

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {t('base.dashboard')}
                </h2>
            }
        >
            <Head title={t('base.dashboard')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {user.name}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
