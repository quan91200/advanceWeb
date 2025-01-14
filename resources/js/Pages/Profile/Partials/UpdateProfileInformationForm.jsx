import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import Tooltip from '@/Components/Tooltip'
import { Link, useForm, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user

    const { data, setData, errors } =
        useForm({
            name: user.name,
            email: user.email,
            profile_pic: null,
        })

    const [isHovered, setIsHovered] = useState(false)
    const [avatar, setAvatar] = useState(
        user.profile_pic ? `/storage/${user.profile_pic}` : '/images/default.png'
    )
    const [t] = useTranslation("global")

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAvatar(URL.createObjectURL(file))
            setData('profile_pic', file)
        }
    }

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        if (data.profile_pic) {
            formData.append('profile_pic', data.profile_pic)
        }

        router.post(route('profile.update'), formData, {
            method: 'patch',
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t('profile.edit.title')}
                </h2>
                <p className="my-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('profile.edit.desc')}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="avatar" value={t('profile.edit.avatar')} />
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
                                <span className="text-white text-sm">{t('profile.edit.avatar')}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='opacity-45 relative'>
                    <Tooltip
                        content={t('profile.edit.roleToast')}
                        placement="right"
                        arrow={true}
                        delay={300}
                        animation="fade"
                        bgColor="rgba(0,0,0,0.8)"
                    >
                        <InputLabel htmlFor="role" value={t('profile.edit.role')} />
                    </Tooltip>
                    <TextInput
                        value={user.role}
                        disabled
                        className='my-1 block w-full cursor-not-allowed'
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value={t('profile.edit.name')} />
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
                    <InputLabel htmlFor="email" value={t('profile.edit.email')} />
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
                            {t('profile.edit.emailVerifiedToast')}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                {t('profile.edit.emailVerified')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                {t('profile.edit.emailFirm')}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center">
                    <Button variant='success'>{t('button.save')}</Button>
                </div>
            </form>
        </section>
    )
}
