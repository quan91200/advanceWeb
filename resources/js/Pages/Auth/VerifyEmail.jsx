import Button from '@/Components/Button'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function VerifyEmail({ status }) {
    const { t } = useTranslation()
    const { post, processing } = useForm({})

    const submit = (e) => {
        e.preventDefault()

        post(route('verification.send'))
    }

    return (
        <div className='dark:bg-gray-800 min-h-screen flex items-center justify-center'>
            <div className='dark:bg-gray-900 p-5 rounded-md max-w-2xl w-full flex items-center justify-center'>
                <GuestLayout>
                    <Head title="Email Verification" />

                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {t('desc.email.verify')}
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            {t('desc.email.status')}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <Button disabled={processing} variant='info'>
                                {t('desc.email.resend')}
                            </Button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                {t('button.logout')}
                            </Link>
                        </div>
                    </form>
                </GuestLayout>
            </div>
        </div>
    )
}
