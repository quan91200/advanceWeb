import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'

const Edit = ({ user, userHobbies }) => {
    const { t } = useTranslation()
    const { data, setData, processing } = useForm({
        bio: user.profile?.bio,
        gender: user.profile.gender,
        dob: user.profile.dob,
        phone_number: user.profile.phone_number,
        job: user.profile.job,
        relationship: user.profile.relationship,
    })
    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto my-8 space-y-5 p-10">
                {/*Information */}
                <div className="max-w-4xl mx-auto dark:bg-gray-800 bg-gray-200 p-6 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-semibold dark:text-white mb-8">{t('title.editInfor')}</h2>
                    <form className="space-y-8">
                        <div className="flex flex-col w-full space-y-2">
                            <div>
                                <InputLabel htmlFor="gender" value={t('title.gender')} />
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
                                <InputLabel htmlFor="phone_number" value={t('title.phone')} />
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
                                <InputLabel htmlFor="bio" value={t('title.bio')} />
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
                                <InputLabel htmlFor="job" value={t('title.job')} />
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
                                <InputLabel htmlFor="relationship" value={t('title.relationship')} />
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
                                <InputLabel htmlFor="dob" value={t('title.dob')} />
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
                                    {t('button.edit')}
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
                {/*Hobby */}
                <div className='max-w-4xl mx-auto dark:bg-gray-800 bg-gray-200 p-6 rounded-xl shadow-lg'>
                    <h2 className="text-3xl font-semibold dark:text-white mb-8">{t('desc.editHobbies')}</h2>
                    <div className="flex flex-col items-start mt-6 space-y-4">
                        <div className='flex flex-row space-x-2 flex-wrap'>
                            {userHobbies.length > 0 ? (
                                userHobbies.map((myhob, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 cursor-default hover:scale-105">
                                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{myhob.hobby_id.name}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 dark:text-gray-400">{t('desc.noHobbies')}</div>
                            )}
                        </div>
                        <Link href={route('users.hobbies.edit', user.id)} className="w-full">
                            <Button variant="info" className="w-full py-2">
                                {t('button.edit')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit