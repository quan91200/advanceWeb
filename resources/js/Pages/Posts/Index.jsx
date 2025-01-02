import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import Pagination from '@/Components/Pagination'
import SortButton from '@/Components/SortButton'
import TextInput from '@/Components/TextInput'
import CommentIndex from '@/Components/Comment/Index'

const Index = ({ auth, posts, queryParams = null }) => {
    const [t] = useTranslation("global")
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        router.get(route('posts.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return
        searchFieldChanged(name, e.target.value)
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc"
            } else {
                queryParams.sort_direction = "asc"
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = "asc"
        }
        router.get(route("posts.index"), queryParams)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight dark:text-white">
                    {t('base.post')}
                </h2>
            }
        >
            <Head title="Article Space" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className='flex items-center gap-3 mb-6 dark:bg-gray-800 px-3 py-2 rounded-md'>
                                <TextInput
                                    className="w-[30%]"
                                    defaultValue={queryParams.name}
                                    placeholder="Post Name"
                                    onBlur={(e) =>
                                        searchFieldChanged("name", e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                                <SortButton
                                    field="created_at"
                                    label={t('base.created_at')}
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}
                                />
                                <SortButton
                                    field="created_by"
                                    label={t('base.created_by')}
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}
                                />
                            </div>
                            {posts.data.map((post) => {
                                return (
                                    <div key={post.id} className="my-6 p-4 rounded-lg bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={post.user.profile_pic ? `${post.user.profile_pic}` : '/storage/images/default.png'}
                                                alt="User Avatar"
                                                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {post.user.name}
                                                </p>
                                                <div className='flex items-center gap-2'>
                                                    <p className="text-sm text-gray-600 dark:text-slate-200 capitalize">
                                                        {t(`status.${post.status}`)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(post.created_at).toLocaleString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-500 mb-2">{post.content}</h3>
                                        {post.image_url && (
                                            <img
                                                src={post.image_url}
                                                alt="Post Image"
                                                className="w-full h-64 object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <div>
                                            <CommentIndex postId={post.id} initialComments={post.comments} />
                                        </div>
                                    </div>
                                )
                            })
                            }
                            <Pagination links={posts.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index