import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { TiTick } from "react-icons/ti" // Success
import { IoWarningOutline } from "react-icons/io5" // Warning
import { MdErrorOutline } from "react-icons/md" // Error
import { IoInformationCircleOutline } from "react-icons/io5" // Info

const Toast = ({
    open = false,
    onClose = () => { },
    message,
    type,
    pos = "top-left",
    duration = 2000,
}) => {
    useEffect(() => {
        if (open && duration) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [open, duration, onClose])

    if (!open) return null

    const positionClasses = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    }

    const typeClasses = {
        success: "bg-green-500 text-white",
        primary: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-white",
        outlineSuccess: "border-green-500 border-2 bg-transparent text-green-500",
        outlinePrimary: "border-red-500 border-2 bg-transparent text-red-500",
        outlineInfo: "border-blue-500 border-2 bg-transparent text-blue-500",
        outlineWarning: "border-yellow-500 border-2 bg-transparent text-yellow-500"
    }

    const typeIcons = {
        success: <TiTick className="text-white text-xl" />,
        primary: <MdErrorOutline className="text-white text-xl" />,
        info: <IoInformationCircleOutline className="text-white text-xl" />,
        warning: <IoWarningOutline className="text-white text-xl" />,
        outlineSuccess: <TiTick className="text-green-500 text-xl" />,
        outlinePrimary: <MdErrorOutline className="text-red-500 text-xl" />,
        outlineInfo: <IoInformationCircleOutline className="text-blue-500 text-xl" />,
        outlineWarning: <IoWarningOutline className="text-yellow-500 text-xl" />,
    }

    return (
        <div
            className={`fixed ${positionClasses[pos]} p-4 rounded-md shadow-lg flex 
                        items-center gap-2 cursor-pointer animate-fade-in 
                        transition-opacity 
                        duration-500 ${typeClasses[type]} hover:scale-95`
            }
            onClick={onClose}
            style={{ animation: `opacity 1s ease-in-out` }}
        >
            {typeIcons[type]}
            <span className="flex-1">{message}</span>

            {duration !== "none" && (
                <div
                    className="absolute bottom-0 left-0 h-1 bg-white opacity-50 w-full rounded-full"
                    style={{
                        animation: `progress ${duration}ms linear`,
                    }}
                ></div>
            )}
            <style jsx>{`
                @keyframes progress {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0%;
                    }
                }
            `}</style>
        </div>
    )
}

export default Toast

Toast.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.oneOf([
        'success',
        'primary',
        'info',
        'warning',
        'outlineSuccess',
        'outlinePrimary',
        'outlineInfo',
        'outlineWarning'
    ]),
    pos: PropTypes.oneOf([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center'
    ]),
    duration: PropTypes.number
}