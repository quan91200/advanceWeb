import Button from '@/Components/Button'
import { useForm, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function DeletePostForm({ post, closeModal }) {
    const [t] = useTranslation('global')

    const {
        reset,
        errors,
        clearErrors,
    } = useForm()

    const handleClose = () => {
        closeModal()
        clearErrors()
        reset()
    }

    const deletePost = (e) => {
        e.preventDefault()
        if (post && post.id) {
            router.delete(`/posts/${post.id}`, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: (err) => console.log(err),
                onFinish: () => reset(),
            })
        }
    }

    return (
        <form onSubmit={deletePost} className="p-6 space-y-6">
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {t('post.desc')}
            </p>

            {errors && Object.keys(errors).length > 0 && (
                <div className="text-red-500 text-sm mt-2">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="info" onClick={handleClose}>
                    {t('base.cancel')}
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                >
                    {t('post.delete')}
                </Button>
            </div>
        </form>
    )
}