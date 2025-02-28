import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { media } from '@/assets/images'
import Button from '@/Components/Button'
import { useState } from 'react'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div className='flex min-h-screen bg-gray-100 dark:bg-black'>
            <Head title="Log in" />
            <img
                className='absolute -left-20 top-0 max-w-[877px]'
                src='https://laravel.com/assets/img/welcome/background.svg'
            />
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className='w-full flex overflow-hidden xl:max-w-6xl lg:max-w-4xl md:max-w-2xl mx-auto my-36 rounded-md'>
                <div className='flex items-center justify-center w-1/2 dark:bg-black opacity-95 relative'>
                    <GuestLayout>
                        <h3 className='flex justify-center text-xl dark:text-gray-400'>Welcome Back</h3>
                        <form onSubmit={submit} className='px-10'>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <div className="my-4 flex items-center justify-end space-x-2">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400 underline hover:no-underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <Button variant='info' disabled={processing}>
                                    Log in
                                </Button>
                            </div>
                        </form>
                    </GuestLayout>
                    <div className='absolute top-0 left-0 dark:text-gray-100 h-10 w-10 rounded-br-full hover:h-14 hover:w-14 transition duration-150 cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered && (
                            <div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="absolute top-3 left-5 flex flex-col mt-1 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2">
                                <Link
                                    className='underline hover:text-gray-600 cursor-pointer'
                                    href={route('register')}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex w-1/2'>
                    <img
                        alt='Media'
                        src={media}
                        className='w-full h-full'
                    />
                </div>
            </div>
        </div>
    )
}
