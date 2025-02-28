import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { media } from '@/assets/images'
import Button from '@/Components/Button'
import { useState } from 'react'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const submit = (e) => {
        e.preventDefault()

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div className='flex min-h-screen bg-gray-100 dark:bg-black'>
            <img
                className='absolute -left-20 top-0 max-w-[877px]'
                src='https://laravel.com/assets/img/welcome/background.svg'
            />
            <Head title="Register" />
            <div className='w-full flex overflow-hidden xl:max-w-6xl lg:max-w-4xl md:max-w-2xl mx-auto my-36 rounded-md'>
                <div className='flex w-1/2'>
                    <img
                        alt='Media'
                        src={media}
                        className='w-full h-full'
                    />
                </div>
                <div className='flex items-center justify-center w-1/2 dark:bg-black opacity-95 relative'>
                    <GuestLayout>
                        <h3 className='flex justify-center text-xl dark:text-gray-400'>Welcome</h3>
                        <form onSubmit={submit} className='px-10'>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
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
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-4 flex items-center justify-end">
                                <Button disabled={processing} variant='primary'>
                                    Register
                                </Button>
                            </div>
                        </form>
                    </GuestLayout>
                    <div className='absolute top-0 right-0 dark:text-gray-100 h-10 w-10 rounded-bl-full hover:h-14 hover:w-14 transition duration-150 cursor-pointer bg-gradient-to-r from-blue-400 via-purple-500 to-violet-500 animate-gradient-x'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered && (
                            <div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="absolute top-3 right-5 flex flex-col mt-1 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2">
                                <Link
                                    className='underline hover:text-gray-600 cursor-pointer'
                                    href={route('login')}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
