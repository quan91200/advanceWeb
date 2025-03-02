import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import DeleteUserForm from './Partials/DeleteUserForm'
import { MdChevronLeft } from "react-icons/md"
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'

const AcountCenter = ({ mustVerifyEmail, status }) => {
  const { t } = useTranslation()
  return (
    <AuthenticatedLayout
      header={
        <div className='flex items-center space-x-2'>
          <Link href={route('users.settings')}>
            <Button variant='outlinePrimary' size='circle' className='border-none flex items-center justify-center'>
              <MdChevronLeft size={28} />
            </Button>
          </Link>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">
            {t('title.accountCenter')}
          </h2>
        </div>
      }
    >
      <Head title={t('title.accountCenter')} />
      <div className='max-w-3xl mx-auto'>
        <div className="">
          <div className="space-y-6 sm:px-6 lg:px-8">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-2xl"
              />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
              <UpdatePasswordForm className="max-w-2xl" />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
              <DeleteUserForm className="max-w-2xl" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default AcountCenter