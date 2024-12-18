import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"

const colorClasses = {
    primary: "red-500",
    secondary: "gray-500",
    info: "blue-500",
    success: "green-500",
    warning: "yellow-500",
}

const createVariantClass = (color, type) => {
    const baseColor = colorClasses[color] || "gray"
    const outlineClasses = clsx(`
        border-${baseColor} 
        text-${baseColor} 
        bg-transparent 
        hover:bg-${baseColor} 
        hover:border-transparent 
        hover:text-white`)
    const filledClasses = clsx(`
        text-white 
        bg-${baseColor} 
        border-${baseColor} 
        hover:bg-transparent
        hover:border-${baseColor} 
        hover:text-${baseColor}`)

    return type === "outline" ? outlineClasses : filledClasses
}

const variantClasses = (color, variant = "filled") => ({
    primary: createVariantClass(color, variant),
    secondary: createVariantClass("secondary", variant),
    info: createVariantClass("info", variant),
    success: createVariantClass("success", variant),
    warning: createVariantClass("warning", variant),
    outlinePrimary: createVariantClass("primary", "outline"),
    outlineSecondary: createVariantClass("secondary", "outline"),
    outlineInfo: createVariantClass("info", "outline"),
    outlineSuccess: createVariantClass("success", "outline"),
    outlineWarning: createVariantClass("warning", "outline"),
})

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
        circle: "w-12 h-12 rounded-full flex items-center justify-center"
    }

    const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed"

    const variantClass = variantClasses(variant)
    const computedClasses = clsx(
        baseClasses,
        disabled ? disabledClasses : variantClass[variant],
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
    size: PropTypes.oneOf(["small", "medium", "large", 'circle']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default Button