import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import Toast from '@/Components/Toast'
import Tooltip from '@/Components/Tooltip'
import { Link, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { avtDefault } from '@/assets/images'
import { useTranslation } from 'react-i18next'

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user

    const { data, setData, patch, errors } =
        useForm({
            name: user.name,
            email: user.email,
            profile_pic: user.profile_pic,
        })

    const [isHovered, setIsHovered] = useState(false)
    const [avatar, setAvatar] = useState(user.profile_pic || avtDefault)
    const [showToast, setShowToast] = useState(false)
    const [t, i18n] = useTranslation("global")

    const submit = (e) => {
        e.preventDefault()
        patch(route('profile.update'), {
            onSuccess: () => setShowToast(true)
        })
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result)
                setData('profile_pic', file)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t('profile.title')}
                </h2>
                <p className="my-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('profile.para')}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="avatar" value={t('profile.avatar')} />
                    <div
                        className="relative h-36 w-36"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="h-full w-full object-cover rounded-full border-2 border-blue-500 my-1"
                        />
                        <InputError className="mt-2" message={errors.profile_pic} />
                        {isHovered && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    onChange={handleAvatarChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <span className="text-white text-sm">{t('updateProfile.avt')}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='opacity-45 relative'>
                    <Tooltip
                        content="This field displays your current role and cannot be changed."
                        placement="right"
                        arrow={true}
                        delay={300}
                        animation="fade"
                        bgColor="rgba(0,0,0,0.8)"
                    >
                        <InputLabel htmlFor="role" value={t('profile.role')} />
                    </Tooltip>
                    <TextInput
                        value={user.role}
                        disabled
                        className='my-1 block w-full cursor-not-allowed'
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value={t('profile.name')} />
                    <TextInput
                        id="name"
                        className="my-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('profile.email')} />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            {t('profile.text1')}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                {t('profile.text2')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                {t('profile.text3')}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center">
                    <Button variant='success'>{t('base.save')}</Button>
                </div>
                <Toast
                    open={showToast}
                    onClose={() => setShowToast(false)}
                    message={t('profile.toast')}
                    type="success"
                    pos="top-right"
                />
            </form>
        </section>
    )
}
