import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import Pagination from '@/Components/Pagination'

export default function Dashboard({ posts, users, posts_count, users_count }) {
    const [t, i18n] = useTranslation("global")
    const language = i18n.language
    return (
        <AuthenticatedLayout>
            <Head title={t('dashboard')} />
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="dark:bg-gray-800 p-6 border border-gray-200 rounded-md shadow-md bg-gray-50">
                            <h3 className="text-xl font-semibold dark:text-gray-300 whitespace-nowrap">{t('total_posts')}</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">{posts_count}</p>
                        </div>
                        <div className="dark:bg-gray-800 p-6 border border-gray-200 rounded-md shadow-md bg-gray-50">
                            <h3 className="text-xl font-semibold dark:text-gray-300 whitespace-nowrap">{t('total_users')}</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">{users_count}</p>
                        </div>
                    </div>
                    <div>
                        {posts.data.length > 0 ? (
                            <div className='my-4 flex flex-col gap-2'>
                                <h2 className="text-xl font-bold dark:text-gray-300">{t('posts')}</h2>
                                <ul className="space-y-4">
                                    {posts.data.map((post) => (
                                        <li key={post.id} className="p-4 border rounded-md bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 text-gray-600 shadow-md">
                                            <h3 className="text-lg font-semibold">{post.title}</h3>
                                            <p>{post.content}</p>
                                            <small>
                                                {t('post.index.createdAt')}: {new Date(post.created_at).toLocaleDateString(language)}
                                            </small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>{t('no_posts')}</p>
                        )}
                        {users.data.length > 0 ? (
                            <div className='my-4 flex flex-col gap-2'>
                                <h2 className="text-xl font-bold dark:text-gray-300">{t('users')}</h2>
                                <ul className="space-y-2 dark:text-gray-300">
                                    {users.data.map((user) => (
                                        <li key={user.id} className="p-4 border rounded-md bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 text-gray-600 shadow-md">
                                            <div className='flex items-center gap-4'>
                                                <img
                                                    src={user.profile_pic}
                                                    alt={user.name}
                                                    className="w-16 h-16 rounded-full  border-blue-500 dark:border-blue-700 border-2 object-cover"
                                                />
                                                <div>
                                                    <Link href={route("user.show", user.id)}>
                                                        <h3 className="text-lg font-semibold hover:underline">{user.name}</h3>
                                                    </Link>
                                                    <p>{user.email}</p>
                                                    <small>{t('user.created_at')}: {user.created_at}</small>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>{t('no_users')}</p>
                        )}
                    </div>
                </div>

                {posts.meta && posts.meta.links && <Pagination links={posts.meta.links} />}
            </div>
        </AuthenticatedLayout>
    )
}