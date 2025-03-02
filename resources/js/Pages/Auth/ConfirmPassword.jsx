import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function ConfirmPassword() {
    const { t } = useTranslation()
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <div className='dark:bg-gray-800 min-h-screen flex items-center justify-center'>
            <div className='dark:bg-gray-900 p-5 rounded-md max-w-2xl w-full flex items-center justify-center'>
                <GuestLayout>
                    <Head title={t('title.confirmPassword')} />

                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {t('desc.password.confirm')}
                    </div>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value={t('title.password')} />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <Button className="ms-4" disabled={processing} variant='success'>
                                {t('button.confirm')}
                            </Button>
                        </div>
                    </form>
                </GuestLayout>
            </div>
        </div>
    )
}
