import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import Button from '@/Components/Button'
import { MdChevronLeft } from "react-icons/md"

const Trash = ({ posts }) => {
    const { t } = useTranslation()
    const { patch } = useForm()

    const restore = (id) => {
        if (confirm(t('desc.trash.restore'))) {
            patch(route('posts.restore', id))
        }
    }
    const destroy = (id) => {
        if (confirm(t('desc.trash.delete'))) {
            patch(route('posts.delete', id))
        }
    }
    const restoreAll = () => {
        if (confirm(t('desc.trash.restoreAll'))) {
            patch(route('posts.restoreAll'))
        }
    }
    const destroyAll = () => {
        if (confirm(t('desc.trash.deleteAll'))) {
            patch(route('posts.deleteAll'))
        }
    }
    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center space-x-2'>
                    <Link href={route('dashboard')}>
                        <Button variant='outlineInfo' size='circle' className='border-none flex items-center justify-center'>
                            <MdChevronLeft size={28} />
                        </Button>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {t('button.trash')}
                    </h2>
                </div>
            }
        >
            <Head title={t('button.trash')} />
            <div className="max-w-3xl mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="max-w-4xl mx-auto">
                    {posts.length > 0 ? (
                        <table className="w-full border-gray-400 dark:border-gray-950 dark:text-gray-300 rounded-lg shadow-lg overflow-hidden">
                            <thead>
                                <tr className="dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                                    <th className="border p-4 text-left">{t('trash.id')}</th>
                                    <th className="border p-4 text-left">{t('title.status')}</th>
                                    <th className="border p-4 text-left">{t('title.content')}</th>
                                    <th className="border p-4">{t('trash.image')}</th>
                                    <th className="border p-4 text-center">{t('trash.action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="text-left dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                        <td className="border p-4">{post.id}</td>
                                        <td className="border p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                        ${post.status === 'public' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="border p-4 truncate max-w-xs">{post.content}</td>
                                        <td className="border p-4 flex justify-center">
                                            {post.image_url ? (
                                                <img src={post.image_url} alt="Post Image" className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-300" />
                                            ) : (
                                                <span className="text-gray-500 italic">{t('trash.noImage')}</span>
                                            )}
                                        </td>
                                        <td className="border p-4 text-center">
                                            <div>
                                                <p
                                                    className="text-green-500 hover:text-green-700 transition-all px-3 cursor-pointer"
                                                    onClick={() => restore(post.id)}
                                                >
                                                    {t('button.restore')}
                                                </p>

                                                <p
                                                    className="text-red-500 hover:text-red-700 transition-all px-3 cursor-pointer"
                                                    onClick={() => destroy(post.id)}
                                                >
                                                    {t('button.delete')}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-300">{t('trash.noTrash')}</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Trash