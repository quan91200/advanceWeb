import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({
    children,
    content,
    className = '',
    placement = 'bottom',
    delay = 200,
    bgColor = 'black',
    animation = "fade"
}) => {
    const [visible, setVisible] = useState(false)
    const tooltipRef = useRef(null)
    const targetRef = useRef(null)

    let timer

    const showTooltip = () => {
        timer = setTimeout(() => setVisible(true), delay)
    }

    const hideTooltip = () => {
        clearTimeout(timer)
        setVisible(false)
    }

    const getPositionClasses = () => {
        switch (placement) {
            case 'top':
                return {
                    contentClasses: 'bottom-full left-1/2 transform mb-1',
                }
            case 'bottom':
                return {
                    contentClasses: 'top-full left-1/2 transform mt-1',
                }
            case 'left':
                return {
                    contentClasses: 'right-full top-1/2 transform -translate-y-1/2 mr-1',
                }
            case 'right':
                return {
                    contentClasses: 'left-full top-1/2 transform -translate-y-1/2 ml-1',
                }
            default:
                return {
                    contentClasses: 'bottom-full left-1/2 transform mb-1',
                }

        }
    }

    const { contentClasses } = getPositionClasses()

    return (
        <div
            ref={targetRef}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            className="relative inline-block cursor-pointer"
        >
            {children}
            {visible && (
                <div
                    ref={tooltipRef}
                    className={`absolute text-white p-2 rounded text-sm whitespace-nowrap z-10 ${contentClasses} ${className}`}
                    style={{
                        animation: animation === "fade" ? "fadeIn 0.2s ease-out" : "scaleUp 0.2s ease-out",
                        backgroundColor: bgColor
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    )
}

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    delay: PropTypes.number,
    arrow: PropTypes.bool,
    animation: PropTypes.oneOf(['fade', 'scale']),
    bgColor: PropTypes.string
}

export default Tooltip