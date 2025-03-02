import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import { Transition } from '@headlessui/react'
import { Link, useForm, usePage, router } from '@inertiajs/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { t } = useTranslation()
    const user = usePage().props.auth.user
    const [isHovered, setIsHovered] = useState(false)
    const [avatar, setAvatar] = useState(`/storage/${user.profile_pic}`)

    const { data, setData, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profile_pic: user.profile_pic,
        })
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
        router.post(route('users.update', user.id), formData, {
            onSuccess: () => alert('Cập nhật thành công!'),
            onError: (errors) => {
                alert('Có lỗi xảy ra!')
            },
        })
    }
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t('title.personal')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('desc.profile.personal')}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="relative h-40 w-40">
                    <div
                        className="relative h-full w-full rounded-full overflow-hidden border-4 border-blue-500"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={avatar}
                            className="h-full w-full object-cover"
                            alt="User Avatar"
                        />
                        {isHovered && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={handleAvatarChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <span className="text-white text-lg font-bold">{t('desc.profile.changeAvt')}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value={t('desc.profile.name')} />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('desc.profile.email')} />

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
                            {t('desc.profile.verify')}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                {t('desc.profile.click')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                {t('desc.profile.new')}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing} variant='success'>{t('button.save')}</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('button.save')}.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}
