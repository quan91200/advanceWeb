import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const Edit = () => {
    return (
        <AuthenticatedLayout>
            <div className='max-w-3xl mx-auto mt-5'>
                <p className='text-gray-100'>Edit</p>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit