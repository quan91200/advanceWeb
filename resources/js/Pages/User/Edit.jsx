import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Button from '@/Components/Button'

const Edit = ({ user, userHobbies }) => {
    const { data, setData, processing } = useForm({
        name: user?.name,
        email: user?.email,
        profile_pic: null,
        bio: user.profile?.bio,
        gender: user.profile.gender,
        dob: user.profile.dob,
        phone_number: user.profile.phone_number,
        job: user.profile.job,
        relationship: user.profile.relationship,
    })
    const [isHovered, setIsHovered] = useState(false)
    const [avatar, setAvatar] = useState(user.profile_pic)

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
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto my-8 space-y-5">
                {/*Profile */}
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-white mb-8">Edit Your Profile</h2>
                    <form onSubmit={submit} className="space-y-8">
                        <div className="flex items-center space-x-6">
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
                                            <span className="text-white text-lg font-bold">Change Avatar</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        className="mt-2 w-full py-2 px-4 border-2 border-gray-300 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        className="mt-2 w-full py-2 px-4 border-2 border-gray-300 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-6 space-x-4">
                            <Link href={route('users.show', user.id)} className="w-full">
                                <Button variant="success" className="w-full">
                                    Done
                                </Button>
                            </Link>
                            <Button variant="warning" disabled={processing} className="w-full">
                                {processing ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
                {/*Information */}
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-white mb-8">Edit Your Information</h2>
                    <form className="space-y-8">
                        <div className="flex flex-col w-full space-y-2">
                            <div>
                                <InputLabel htmlFor="gender" value='gender' />
                                <TextInput
                                    className="my-1 block w-full cursor-not-allowed opacity-50"
                                    value={data.gender || 'Other'}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    isFocused
                                    disabled
                                    autoComplete="gender"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="phone_number" value='phone_number' />
                                <TextInput
                                    className="my-1 block w-full cursor-not-allowed opacity-50"
                                    value={data.phone_number || ''}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    isFocused
                                    disabled
                                    autoComplete="phone_number"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="bio" value='bio' />
                                <TextInput
                                    type="textarea"
                                    className="my-1 block w-full cursor-not-allowed opacity-50"
                                    value={data.bio || ''}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    isFocused
                                    disabled
                                    autoComplete="bio"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="job" value='job' />
                                <TextInput
                                    className="my-1 block w-full cursor-not-allowed opacity-50"
                                    value={data.job || ''}
                                    onChange={(e) => setData('job', e.target.value)}
                                    isFocused
                                    disabled
                                    autoComplete="job"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="relationship" value='relationship' />
                                <TextInput
                                    className="my-1 block w-full cursor-not-allowed opacity-50"
                                    value={data.relationship || ''}
                                    onChange={(e) => setData('relationship', e.target.value)}
                                    isFocused
                                    disabled
                                    autoComplete="relationship"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="dob" value='dob' />
                                <TextInput
                                    className="my-1 block w-full cursor-not-allowed opacity-50"
                                    value={data.dob || ''}
                                    type='date'
                                    onChange={(e) => setData('dob', e.target.value)}
                                    isFocused
                                    disabled
                                    autoComplete="dob"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 space-x-4">
                            <Link href={route('users.profiles.edit', user.id)} className="w-full">
                                <Button variant="info" className="w-full py-2">
                                    Edit Information
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
                {/*Hobby */}
                <div className='max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg'>
                    <h2 className="text-3xl font-semibold text-white mb-8">Edit Your Hobbies</h2>
                    <div className="flex flex-col items-start mt-6 space-y-4">
                        <div className='flex flex-row space-x-2 flex-wrap'>
                            {userHobbies.length > 0 ? (
                                userHobbies.map((myhob, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 cursor-default hover:scale-105">
                                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{myhob.hobby_id.name}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 dark:text-gray-400">You don't have any hobbies yet. Add some!</div>
                            )}
                        </div>
                        <Link href={route('users.hobbies.edit', user.id)} className="w-full">
                            <Button variant="info" className="w-full py-2">
                                Edit Hobbies
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit