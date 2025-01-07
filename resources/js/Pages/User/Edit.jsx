import React, { useEffect, useState } from 'react'
import Modal from '@/Components/Modal'
import { useForm } from '@inertiajs/react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'

const Edit = ({ user, isOpen, onClose }) => {
    const [t] = useTranslation('global')
    const { data, setData, put, processing, errors } = useForm({
        hobbies: user.hobbies || '',
        dob: user.dob || '',
        address: user.address || '',
        phone_number: user.phone_number || '',
        job: user.job || '',
        relationship: user.relationship || ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (user?.data) {
            setData({
                hobbies: user.data.hobbies || '',
                dob: user.data.dob || '',
                address: user.data.address || '',
                phone_number: user.data.phone_number || '',
                job: user.data.job || '',
                relationship: user.data.relationship || '',
                _method: "PUT"
            })
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        put(route("user.update", user.id), {
            onSuccess: () => {
                setIsSubmitting(false)
                onClose()
            },
            onError: () => {
                console.log(errors)
                setIsSubmitting(false)
            }
        })
    }

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Edit User Information
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Hobbies
                        </label>
                        <textarea
                            id="hobbies"
                            name="hobbies"
                            value={data.hobbies}
                            onChange={(e) => setData('hobbies', e.target.value)}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            rows="2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date of Birth
                        </label>
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            value={data.dob}
                            onChange={(e) => setData('dob', e.target.value)}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="job" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Job
                        </label>
                        <input
                            id="job"
                            name="job"
                            type="text"
                            value={data.job}
                            onChange={(e) => setData('job', e.target.value)}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Relationship Status
                        </label>
                        <input
                            id="relationship"
                            name="relationship"
                            type="text"
                            value={data.relationship}
                            onChange={(e) => setData('relationship', e.target.value)}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <Button
                            onClick={onClose}
                            variant='warning'
                        >
                            {t('button.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant='info'
                            disabled={processing || isSubmitting}
                        >
                            {processing || isSubmitting ? t('button.saving') : t('button.save')}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default Edit