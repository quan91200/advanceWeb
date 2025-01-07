import React from 'react'
import { useForm, Head, Link } from '@inertiajs/react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const Create = ({ auth }) => {
    const [t] = useTranslation("global")
    const { data, setData, post, processing } = useForm({
        content: "",
        status: "",
        image_url: ""
    })
    const onSubmit = (e) => {
        e.preventDefault()
        post(route("posts.store"))
    }
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t('post.create.title')} />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                        <form onSubmit={onSubmit}>
                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    {t('post.create.content')}
                                </label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData("content", e.target.value)}
                                    required
                                    className="mt-2 w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    {t('post.create.status')}
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    required
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-2 w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                >
                                    <option value="" disabled>{t('post.status.select')}</option>
                                    <option value="public">{t('post.status.public')}</option>
                                    <option value="private">{t('post.status.private')}</option>
                                    <option value="friend">{t('post.status.friend')}</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    {t('post.create.image')}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setData("image_url", e.target.files[0])}
                                    className="mt-2 w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <Button variant="outlinePrimary" >
                                    <Link href={route("dashboard")}>
                                        {t('button.cancel')}
                                    </Link>
                                </Button>
                                <Button
                                    variant="outlineSuccess"
                                    disabled={processing}
                                >
                                    {processing ? t('button.creating') : t('button.create')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create