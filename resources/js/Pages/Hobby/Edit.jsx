import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Button from '@/Components/Button'
import InputLabel from '@/Components/InputLabel'
import { Link, useForm } from '@inertiajs/react'
import DropdownSearch from '@/Components/DropdownSearch'
import { IoTrashOutline } from "react-icons/io5"
import { BsTrash2 } from "react-icons/bs"
import { useTranslation } from 'react-i18next'

const Edit = ({ userHobbies, notInUserHobbies }) => {
    const { t } = useTranslation()
    const [selectedOption, setSelectedOption] = useState({})
    const [isHovered, setIsHovered] = useState(false)
    const userId = userHobbies[0].user_id
    const { data, setData, processing, patch } = useForm({
        name: selectedOption ? selectedOption.name : '',
        desc: selectedOption ? selectedOption.description : '',
    })
    const { delete: destroy } = useForm()
    const handleSelectHobby = (hobby) => {
        setSelectedOption(hobby)
        setData({
            name: hobby.name,
            desc: hobby.description,
        })
    }
    const submit = (e) => {
        e.preventDefault()
        patch(route('users.addHobbies', [userId, selectedOption.id]), {
            onSuccess: () => {
                // Khi submit thành công, reset selectedOption và form data
                setSelectedOption(null)
                setData({
                    name: '',
                    desc: '',
                })
            }
        })
    }
    const handleRemoveHobby = (hobbyId) => {
        destroy(route("users.removeMyHobby", [userId, hobbyId]), {
            onSuccess: () => alert("Hobby removed successfully!"),
            onError: () => alert("Failed to remove hobby."),
        })
    }
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{t('desc.yourHobbies')}</h2>

                <div className='flex items-start flex-col w-full space-y-2'>
                    {userHobbies.length > 0 ? (
                        userHobbies.map((myhob, index) => (
                            <div key={index} className="relative w-full flex items-center group">
                                <div className="flex-grow inset-0 transition-all duration-300 ease-in-out transform group-hover:-translate-x-[8%] bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{myhob.hobby_id.name}</div>
                                    <div className="text-gray-600 dark:text-gray-300 mt-2">{myhob.hobby_id.description}</div>
                                </div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out bg-gray-700 p-6 rounded">
                                    <button
                                        onClick={() => handleRemoveHobby(myhob.hobby_id.id)}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className='flex items-center justify-center hover:text-red-700 hover:scale-150 text-red-500'
                                    >
                                        {isHovered ? <BsTrash2 /> : <IoTrashOutline size={18} />}
                                    </button>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="text-gray-500 dark:text-gray-400">{t("desc.noHobbies")}</div>
                    )}
                </div>

                <div className='flex flex-col items-start space-y-2'>
                    <h2 className='text-xl font-bold dark:text-gray-100'>{t('desc.addHobbies')}</h2>
                    <form onSubmit={submit} className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full flex items-center flex-col space-y-3'>
                        <div className='w-full'>
                            <InputLabel htmlFor="name" value="Hobby Name" />
                            <DropdownSearch
                                options={notInUserHobbies}
                                onChange={handleSelectHobby}
                                selected={selectedOption}
                                placeholder="Select Hobby"
                            />
                        </div>
                        <div className='w-full flex items-center space-x-2'>
                            <Link
                                className='w-full'
                                href={route('users.edit', userId)}>
                                <Button variant='primary' className='w-full'>
                                    {t('button.back')}
                                </Button>
                            </Link>
                            <Button variant='warning' className='w-full' disabled={processing}>{t('button.save')}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit