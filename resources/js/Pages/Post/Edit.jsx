import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { MdWarning } from "react-icons/md"
import { Link, router } from '@inertiajs/react'
import Button from '@/Components/Button'

const Edit = () => {
    const [progress, setProgress] = useState(false)

    const handleUpgrade = (e) => {
        e.preventDefault()
        setProgress(true)

        router.visit(route('users.price'), {
            onFinish: () => setProgress(false),
        })
    }

    return (
        <AuthenticatedLayout>
            <div className='max-w-3xl mx-auto pt-16 flex flex-col items-center space-y-4'>
                <MdWarning size={50} className="text-red-500" />
                <p className='text-red-500 font-semibold text-center text-lg'>
                    Bạn cần nâng cấp gói để sử dụng tính năng này.
                </p>
                <Link href="#" onClick={handleUpgrade}>
                    <Button variant='info' disabled={progress}>
                        {progress ? 'Đang chuyển hướng...' : 'Nâng cấp ngay'}
                    </Button>
                </Link>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit