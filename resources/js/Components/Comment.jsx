import React, { useState, useEffect } from 'react'
import { useForm, router } from '@inertiajs/react'
import Button from '@/Components/Button'
import { useTranslation } from 'react-i18next'
import TextInput from './TextInput'

const Comment = ({ comment }) => {
    const [t, i18n] = useTranslation("global")
    const {
        data,
        setData,
        reset,
        clearErrors
    } = useForm({
        content: "",
        image_url: ""
    })

    useEffect(() => {
        if (comment) {
            setData('content', comment.content)
            setData('image_url', comment.image_url)
        }
    }, [comment, setData])

    const handleClose = () => {
        clearErrors()
        reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const reqData = {
            content: data.content,
            image_url: data.image_url
        }

        if (comment) {
            router.patch(`/comment/${comment.id}`, reqData, {
                onSuccess: () => {

                },
                onError: (error) => {
                    console.log('Errors:', error)
                }
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='my-2 px-2'>
                <div className='flex items-center gap-2'>
                    {/* Avatar */}
                    <div>
                        <img
                            alt='avt'
                            src=''
                        />
                    </div>
                    {/** Input */}
                    <div>
                        <TextInput

                        />

                    </div>

                </div>
            </div>
        </form>
    )
}

export default Comment