import Button from '@/Components/Button'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Create = () => {
    const { t } = useTranslation()
    const { data, setData, post, processing, errors } = useForm({
        content: '',
        status: 'public',
        image_url: null,
    })

    const [preview, setPreview] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setData('image_url', file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('posts.store')) // Gửi form lên backend
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {t('button.create')}
                </h2>
            }
        >
            <Head title={t('button.create')} />

            <div className="max-w-2xl mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nội dung bài viết */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">{t('title.content')}</label>
                        <textarea
                            className="w-full mt-1 border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                            rows="4"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">{t('title.status')}</label>
                        <select
                            className="w-full mt-1 border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="public">{t('status.public')}</option>
                            <option value="Friend">{t('status.friend')}</option>
                            <option value="private">{t('status.private')}</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    {/* Ảnh */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">{t('title.upload')}</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 dark:text-gray-300" />
                        {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                        {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url}</p>}
                    </div>

                    {/* Nút submit */}
                    <div className='flex items-center space-x-2'>
                        <Button
                            variant='success'
                            disabled={processing}
                        >
                            {processing ? t('button.creating') : t('button.create')}
                        </Button>
                        <Link href='/dashboard'>
                            <Button
                                variant='primary'
                            >
                                {t('button.cancel')}
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create
