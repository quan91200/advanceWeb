import { useForm, Head, Link } from '@inertiajs/react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useEffect } from 'react'

const Edit = ({ auth, posts }) => {
    const [t] = useTranslation("global")
    const {
        data,
        setData,
        put
    } = useForm({
        content: posts.content || '',
        status: posts.status || 'public',
        image_url: '',
        _method: "PUT"
    })
    useEffect(() => {
        if (posts?.data) {
            setData({
                content: posts.data.content || '',
                status: posts.data.status || 'public',
                image_url: '',
                _method: "PUT"
            })
        }
    }, [posts])
    const onSubmit = (e) => {
        e.preventDefault()

        if (!posts?.data?.id) {
            console.error("ID bài viết không hợp lệ")
            return
        }
        put(route("posts.update", posts.data.id))
    }
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t('post.edit.title')} />
            <div className='py-12'>
                <div className='max-w-4xl mx-auto sm:px-6 lg:px-8'>
                    <div className='bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6'>
                        <form onSubmit={onSubmit}>
                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">{t('post.edit.content')}</label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">{t('post.edit.status')}</label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                >
                                    <option value="public">{t('post.status.public')}</option>
                                    <option value="private">{t('post.status.private')}</option>
                                    <option value="friend">{t('post.status.friend')}</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">{t('post.edit.image')}</label>
                                <input
                                    type="file"
                                    id="image_url"
                                    onChange={(e) => setData('image_url', e.target.files[0])}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                />
                            </div>

                            <div className="flex items-center mt-6 gap-2 justify-end">
                                <Button variant='info'>
                                    <Link href={route("user.show", { id: posts.data.user.id })}>
                                        {t('button.cancel')}
                                    </Link>
                                </Button>
                                <Button variant='success'>
                                    {t('button.update')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit