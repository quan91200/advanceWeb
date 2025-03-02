import React from 'react'

const NoHeader = ({ children }) => {
    return (
        <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
            <div className='py-6'>
                {children}
            </div>
        </div>
    )
}

export default NoHeader