import React, { useEffect, useState } from 'react'

const Tabs = ({
    tabs,
    defaultActiveIndex = 0,
    onTabChange,
    containerClass,
    headerClass,
    activeTabClass = "bg-blue-500 text-white border-b-2 border-white",
    inactiveTabClass = "bg-transparent text-gray-100 border-2 border-transparent",
    tabClasses,
}) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
    const [loadTabs, setLoadTabs] = useState([defaultActiveIndex])

    useEffect(() => {
        if (!loadTabs.includes(activeIndex)) {
            setLoadTabs(prevTabs => [...prevTabs, activeIndex])
        }
    }, [activeIndex, loadTabs])

    const handleTab = (index) => {
        setActiveIndex(index)
        if (onTabChange) return onTabChange(index)
    }

    return (
        <div className={`w-full mx-auto ${containerClass}`}>
            <div className={`flex items-center justify-start whitespace-nowrap overflow-x-auto mb-3 ${headerClass}`}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        onClick={() => handleTab(index)}
                        className={`${index === activeIndex ? activeTabClass : inactiveTabClass} px-5 py-2 cursor-pointer relative hover:bg-blue-500 rounded-sm text-gray-800 dark:hover:bg-blue-700 dark:hover:text-gray-100 hover:text-gray-100 font-bold`}
                    >
                        {tab.icon && <span className='mr-2'>{tab.icon}</span>}
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className={`${tabClasses} rounded-sm`}>
                {loadTabs.includes(activeIndex) && tabs[activeIndex].content}
            </div>
        </div>
    )
}

export default Tabs