import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({
    children,
    content,
    placement = 'bottom',
    delay = 200,
    arrow = true,
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
                    contentClasses: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
                    arrowClasses: 'border-t-4 border-l-4 border-r-4 border-b-4 border-solid border-transparent bottom-[-4px] left-1/2 transform -translate-x-1/2 -rotate-45 absolute'
                }
            case 'bottom':
                return {
                    contentClasses: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
                    arrowClasses: 'border-b-4 border-l-4 border-r-4 border-t-4 border-solid border-transparent top-[-4px] left-1/2 transform -translate-x-1/2 -rotate-45 absolute'
                }
            case 'left':
                return {
                    contentClasses: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
                    arrowClasses: 'border-l-4 border-t-4 border-b-4 border-r-4 border-solid border-transparent right-[-4px] top-1/2 transform -translate-y-1/2 -rotate-45 absolute'
                }
            case 'right':
                return {
                    contentClasses: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
                    arrowClasses: 'border-r-4 border-t-4 border-b-4 border-l-4 border-solid border-transparent left-[-4px] top-1/2 transform -translate-y-1/2 -rotate-45 absolute'
                }
            default:
                return {
                    contentClasses: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
                    arrowClasses: 'border-t-4 border-l-4 border-r-4 border-b-4 border-solid border-transparent bottom-[-4px] left-1/2 transform -translate-x-1/2 -rotate-45 absolute'
                }

        }
    }

    const { contentClasses, arrowClasses } = getPositionClasses()

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
                    className={`absolute text-white p-2 rounded text-sm whitespace-nowrap z-10 ${contentClasses}`}
                    style={{
                        animation: animation === "fade" ? "fadeIn 0.2s ease-out" : "scaleUp 0.2s ease-out",
                        backgroundColor: bgColor
                    }}
                >
                    {content}
                    {arrow &&
                        <div
                            className={arrowClasses}
                            style={{
                                backgroundColor: bgColor
                            }}
                        />}
                </div>
            )}
        </div>
    )
}

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    delay: PropTypes.number,
    arrow: PropTypes.bool,
    animation: PropTypes.oneOf(['fade', 'scale']),
    bgColor: PropTypes.string
}

export default Tooltip