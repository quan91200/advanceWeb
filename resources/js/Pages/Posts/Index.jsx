import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import Pagination from '@/Components/Pagination'
import SortButton from '@/Components/SortButton'
import TextInput from '@/Components/TextInput'
import Tooltip from '@/Components/Tooltip'
import Button from '@/Components/Button'

const Index = ({ posts, queryParams = null }) => {
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
        <AuthenticatedLayout>
            <Head title="Article Space" />
            <div className="pb-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className='flex items-center gap-3 mb-6 dark:bg-gray-800 px-3 py-2 rounded-md relative bg-white shadow-md'>
                                <TextInput
                                    className="w-[30%] outline-none"
                                    defaultValue={queryParams.name}
                                    placeholder={t('post.index.search')}
                                    onBlur={(e) =>
                                        searchFieldChanged("name", e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                                <SortButton
                                    field="created_at"
                                    label={t('post.index.createdAt')}
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}
                                />
                                <SortButton
                                    field="created_by"
                                    label={t('post.index.createdBy')}
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}
                                />
                                <Button variant='info' className='absolute right-0 mr-3'>
                                    <Link href={route('posts.create')}>
                                        {t('post.create.title')}
                                    </Link>
                                </Button>
                            </div>
                            {posts.data.map((post) => {
                                return (
                                    <div key={post.id} className="my-6 p-4 rounded-md bg-white shadow-md sm:rounded-lg dark:bg-gray-800 transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <Tooltip
                                                bgColor='rgb(100 116 139)'
                                                className='rounded p-2'
                                                content={`${post.user.email}`}
                                                placement='top'
                                            >
                                                <img
                                                    src={post.user.profile_pic ? `${post.user.profile_pic}` : '/storage/images/default.png'}
                                                    alt="User Avatar"
                                                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500"
                                                />
                                            </Tooltip>
                                            <div className="flex flex-col">
                                                <Link
                                                    href={route("user.show", { id: post.user.id })}
                                                >
                                                    <p className="text-lg font-semibold text-gray-800 dark:text-white hover:underline">
                                                        {post.user.name}
                                                    </p>
                                                </Link>
                                                <div className='flex items-center gap-2'>
                                                    <p className="text-sm text-gray-600 dark:text-slate-200 capitalize">
                                                        {t(`post.status.${post.status}`)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {post.created_at}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-500 mb-2">{post.content}</h3>
                                        {post.image_url && (
                                            <img
                                                src={post.image_url}
                                                alt="Post Image"
                                                className="w-full h-96 object-contain rounded-md"
                                            />
                                        )}
                                        <div>
                                            comment
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