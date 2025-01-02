import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import SortButton from '@/Components/SortButton'
import Button from '@/Components/Button'
import Toast from '@/Components/Toast'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const Trashed = ({ trashed, auth, queryParams }) => {
    const [t] = useTranslation("global")
    queryParams = queryParams || {}
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const showToast = (message) => {
        setToastMessage(message)
        setToast(true)
    }

    const sortChanged = (name) => {
        const updatedParams = { ...queryParams }
        if (name === queryParams.sort_field) {
            updatedParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc"
        } else {
            updatedParams.sort_field = name
            updatedParams.sort_direction = "asc"
        }
        router.get(route("posts.trashed", { userId: auth.user.id }), updatedParams)
    }

    const handleRestore = (postId) => {
        router.post(route('posts.restore', postId), {
            onSuccess: () => showToast(t('trash.restoreSuccess')),
            onError: () => showToast(t('trash.restoreError')),
        })
    }

    const handleForceDelete = (postId) => {
        router.post(route('posts.forceDelete', postId), {
            onSuccess: () => showToast(t('trash.forceDeleteSuccess')),
            onError: () => showToast(t('trash.forceDeleteError')),
        })
    }

    const handleRestoreAll = () => {
        router.post(route("posts.restoreAll", { userId: auth.user.id }), {
            onSuccess: () => showToast(t('trash.restoreAllSuccess')),
            onError: () => showToast(t('trash.restoreAllError')),
        })
    }

    const handleForceDeleteAll = () => {
        router.post(route("posts.forceDeleteAll", { userId: auth.user.id }), {
            onSuccess: () => showToast(t('trash.forceDeleteAllSuccess')),
            onError: () => showToast(t('trash.forceDeleteAllError')),
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight dark:text-white">{t('trash.deleted')}</h2>}
        >
            <Head title={t("post.trashed")} />
            <div className="py-6">
                <div className="overflow-hidden bg-white shadow-xl rounded-lg dark:bg-gray-800 max-w-7xl mx-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                                >
                                    <SortButton
                                        field="content"
                                        label={t("post.content")}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                                >
                                    <SortButton
                                        field="created_at"
                                        label={t("post.created_at")}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                                >
                                    <SortButton
                                        field="deleted_at"
                                        label={t("post.deleted_at")}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider dark:text-white"
                                >
                                    {t('trash.task')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {trashed.data.length > 0 ? (
                                trashed.data.map((post) => {
                                    return (
                                        <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {post.content}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {new Date(post.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {new Date(post.deleted_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <Link
                                                    href="#"
                                                    onClick={() => handleRestore(post.id)}
                                                    className="text-blue-500 hover:text-indigo-900 dark:text-blue-500 dark:hover:text-indigo-600"
                                                >
                                                    {t('trash.restore')}
                                                </Link>
                                                <span className="mx-2">|</span>
                                                <Link
                                                    href="#"
                                                    onClick={() => handleForceDelete(post.id)}
                                                    className="text-red-500 hover:text-red-900 dark:text-red-500 dark:hover:text-red-600"
                                                >
                                                    {t('trash.force')}
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                                        {t('trash.para')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='flex items-center gap-3 my-2 mr-10 justify-end'>
                        <Button
                            onClick={handleRestoreAll}
                            variant='outlineInfo'
                        >
                            {t("trash.restoreAll")}
                        </Button>

                        <Button
                            onClick={handleForceDeleteAll}
                            variant='outlinePrimary'
                        >
                            {t("trash.forceAll")}
                        </Button>
                    </div>
                </div>
            </div>
            <Toast
                message={toastMessage}
                duration={2000}
                pos='top-right'
                onClose={() => setToast(false)}
                show={toast}
            />
        </AuthenticatedLayout>
    )
}

export default Trashed
