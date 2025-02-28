import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import Pagination from '@/Components/Pagination'

export default function Dashboard({ post }) {
    const user = usePage().props.user
    const props = usePage().props
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="dark:bg-gray-800 p-6 border border-gray-200 rounded-md shadow-md bg-gray-50 flex items-center space-x-2 justify-between">
                            <h3 className="text-xl font-semibold dark:text-gray-300 whitespace-nowrap">Total Posts</h3>
                            <p className="text-3xl font-bold text-blue-600">{props.post_count}</p>
                        </div>
                        <div className="dark:bg-gray-800 p-6 border border-gray-200 rounded-md shadow-md bg-gray-50 flex items-center space-x-2 justify-between">
                            <h3 className="text-xl font-semibold dark:text-gray-300 whitespace-nowrap">Total User</h3>
                            <p className="text-3xl font-bold text-yellow-600">{props.user_count}</p>
                        </div>
                    </div>
                    <div>
                        {user.map((u) => {
                            return (
                                <div
                                    key={u.id}
                                    className='my-6 p-4 rounded bg-white dark:bg-gray-800 shadow-md flex items-center space-x-2 text-gray-100'
                                >
                                    <div className='h-12 w-12 mr-4 border border-blue-500 rounded-full'>
                                        <img alt='avatar' src={u.profile_pic} className='w-full h-full rounded-full object-cover' />
                                    </div>
                                    <div className='flex flex-col cursor-pointer'>
                                        <Link href={route('users.show', u.id)} className='hover:underline'>
                                            {u.name}
                                        </Link>
                                        <p className='opacity-75'>{u.email}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {post && post.links && <Pagination links={post.links} />}
            </div>
        </AuthenticatedLayout>
    )
}
