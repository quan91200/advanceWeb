import Button from '@/Components/Button'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DeleteUserForm({ className = '' }) {
    const { t } = useTranslation()
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef()

    const {
        data,
        setData,
        delete: destroy,
        processing,
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

        destroy(route('users.destroy'), {
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
                    {t('title.delelteAcc')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('desc.setting.delete')}
                </p>
            </header>

            <Button onClick={confirmUserDeletion} variant='primary'>
                {t('title.delelteAcc')}
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className='dark:bg-gray-900 bg-white p-6 rounded-lg max-w-2xl h-96 my-auto mx-auto flex items-center justify-center'>
                    <form onSubmit={deleteUser} className="flex items-start justify-center flex-col space-y-2 w-full">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {t('desc.setting.q')}
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {t('desc.setting.del')}
                        </p>

                        <div className="mt-6 w-full">
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
                                className="mt-1 block w-full"
                                isFocused
                                placeholder="Password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex justify-end w-full">
                            <Button variant='primary' onClick={closeModal}>
                                {t('button.cancel')}
                            </Button>

                            <Button variant='warning' className="ms-3" disabled={processing}>
                                {t('title.delelteAcc')}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    )
}
