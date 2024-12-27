import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"

const colorVariants = {
    primary: {
        outline: "border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:border-transparent",
        filled: "bg-red-500 text-white border-red-500 hover:bg-transparent hover:text-red-500 hover:border-red-500"
    },
    secondary: {
        outline: "border-gray-500 text-gray-500 bg-transparent hover:bg-gray-500 hover:text-white hover:border-transparent",
        filled: "bg-gray-500 text-white border-gray-500 hover:bg-transparent hover:text-gray-500 hover:border-gray-500"
    },
    info: {
        outline: "border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white hover:border-transparent",
        filled: "bg-blue-500 text-white border-blue-500 hover:bg-transparent hover:text-blue-500 hover:border-blue-500"
    },
    success: {
        outline: "border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white hover:border-transparent",
        filled: "bg-green-500 text-white border-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500"
    },
    warning: {
        outline: "border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-white hover:border-transparent",
        filled: "bg-yellow-500 text-white border-yellow-500 hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500"
    }
}

const Button = ({
    children,
    variant = "secondary",
    size = "medium",
    onClick,
    disabled = false,
    className = "",
    ...rest
}) => {
    const baseClasses = "transition duration-200 ease-in-out rounded font-medium focus:outline-none"

    const sizeClasses = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
        full: "w-full px-4 py-2 text-xl",
        circle: "w-12 h-12 rounded-full flex items-center justify-center"
    }

    const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed"

    const [color, type] = variant.includes("outline")
        ? [variant.replace("outline", "").toLowerCase(), "outline"]
        : [variant, "filled"]

    const computedClasses = clsx(
        baseClasses,
        disabled ? disabledClasses : colorVariants[color]?.[type],
        size === 'circle' ? sizeClasses['circle'] : sizeClasses[size],
        className
    )

    return (
        <button
            className={clsx(computedClasses, "border-2")}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        "primary", "secondary", "info", "success", "warning",
        "outlinePrimary", "outlineSecondary", "outlineInfo", "outlineSuccess", "outlineWarning"
    ]),
    size: PropTypes.oneOf(["small", "medium", "large", "full", 'circle']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default Button