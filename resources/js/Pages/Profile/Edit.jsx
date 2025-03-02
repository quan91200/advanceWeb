import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import { useTranslation } from 'react-i18next'

const Edit = ({ profile }) => {
    const { t } = useTranslation()
    const { data, setData, patch, processing } = useForm({
        phone_number: profile?.phone_number || '',
        dob: profile?.dob || '',
        gender: profile?.gender || 'male',
        job: profile?.job || '',
        relationship: profile?.relationship || 'single',
        bio: profile?.bio || '',
    })
    const submit = (e) => {
        e.preventDefault()
        patch(route('users.profiles.update', { id: profile.user_id.id }), {
            onSuccess: () => alert("Done"),
            onError: () => alert("Errors")
        })
    }
    return (
        <AuthenticatedLayout>
            <Head title={t('title.editProfile')} />
            <div className="max-w-3xl w-full mx-auto my-10 p-8 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-6">{t('title.editProfile')}</h2>
                <form onSubmit={submit} className="space-y-6">
                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300">
                            {t('title.phone')}
                        </label>
                        <TextInput
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number || ''}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            isFocused
                            className="mt-1 block w-full px-4 py-2 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                            placeholder="Your phone number"
                        />
                    </div>
                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-300">
                            {t('title.dob')}
                        </label>
                        <TextInput
                            type="date"
                            id="dob"
                            name="dob"
                            value={data.dob || ''}
                            onChange={(e) => setData('dob', e.target.value)}
                            isFocused
                            className="w-full"
                        />
                    </div>
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                            {t('title.gender')}
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender || 'male'}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 w-full"
                        >
                            <option value="male">{t('gender.male')}</option>
                            <option value="female">{t('gender.female')}</option>
                            <option value="other">{t('gender.other')}</option>
                        </select>
                    </div>
                    {/* Job */}
                    <div>
                        <label htmlFor="job" className="block text-sm font-medium text-gray-300">
                            {t('title.job')}
                        </label>
                        <TextInput
                            className='w-full'
                            id="job"
                            name="job"
                            value={data.job || ''}
                            onChange={(e) => setData('job', e.target.value)}
                            isFocused
                            placeholder="Your job"
                        />
                    </div>
                    {/* Relationship */}
                    <div>
                        <label htmlFor="relationship" className="block text-sm font-medium text-gray-300">
                            {t('title.relationship')}
                        </label>
                        <select
                            id="relationship"
                            name="relationship"
                            value={data.relationship || 'relationship'}
                            onChange={(e) => setData('relationship', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 w-full"
                        >
                            <option value="single">{t('relationship.single')}</option>
                            <option value="married">{t('relationship.married')}</option>
                            <option value="divorced">{t('relationship.divorced')}</option>
                            <option value="complicated">{t('relationship.complicated')}</option>
                        </select>
                    </div>
                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
                            {t('title.bio')}
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={data.bio || ''}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 w-full"
                            rows="4"
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    <div className="flex items-center justify-end space-x-4 w-full">
                        <Link href={route('users.edit', profile.user_id.id)} className='w-full'>
                            <Button variant='warning' className='w-full'>
                                {t('button.cancel')}
                            </Button>
                        </Link>
                        <Button variant='success' disabled={processing} className='w-full'
                        >
                            {processing ? t('button.updating') : t('button.update')}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit