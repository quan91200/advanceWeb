import Button from '@/Components/Button'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef()
    const [t, i18n] = useTranslation('global')
    const {
        data,
        setData,
        delete: destroy,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    })

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const deleteUser = (e) => {
        e.preventDefault()

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        })
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)

        clearErrors()
        reset()
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t('delete.title')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('delete.para')}
                </p>
            </header>

            <Button onClick={confirmUserDeletion} variant='primary'>
                {t('delete.title')}
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t('delete.ask')}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t('delete.desc')}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={closeModal} variant='info'>
                            {t('base.cancel')}
                        </Button>

                        <Button className="ms-3" variant='primary'>
                            {t('delete.title')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
