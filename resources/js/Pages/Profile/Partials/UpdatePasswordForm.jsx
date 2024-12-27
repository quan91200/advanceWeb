import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import Toast from '@/Components/Toast'
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useTranslation } from 'react-i18next'

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef()
    const currentPasswordInput = useRef()
    const [showToast, setShowToast] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [t, i18n] = useTranslation("global")

    const { data, setData, errors, put, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const updatePassword = (e) => {
        e.preventDefault()

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('current_password', 'password', 'password_confirmation')
                setShowToast(true)
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                    passwordInput.current.focus()
                }

                if (errors.current_password) {
                    reset('current_password')
                    currentPasswordInput.current.focus()
                }
            },
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t("password.title")}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t("password.para")}
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value={t("password.curPass")} />
                    <div className="relative">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type={showCurrentPassword ? 'text' : 'password'}
                            className="mt-1 block w-full pr-10"
                            autoComplete="current-password"
                        />
                        <span
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer dark:text-slate-500"
                        >
                            {showCurrentPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t("password.newPass")} />
                    <div className="relative">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showNewPassword ? 'text' : 'password'}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                        />
                        <span
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer dark:text-slate-500"
                        >
                            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value={t("password.firmPass")} />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={showNewPassword ? 'text' : 'password'}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <Button variant='warning'>{t("base.save")}</Button>
                </div>
                <Toast
                    open={showToast}
                    onClose={() => setShowToast(false)}
                    message={t("password.toast")}
                    type="success"
                    pos="top-right"
                />
            </form>
        </section>
    )
}
