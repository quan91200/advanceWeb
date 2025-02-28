import { useState, useRef, useEffect } from "react"
import { FaCaretDown } from "react-icons/fa"

const DropdownSearch = ({
    options,
    selected,
    onChange,
    placeholder = "select an option"
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const dropdownSearchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownSearchRef.current && !dropdownSearchRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchItem.toLowerCase())
    )

    const handleOptionClick = (option) => {
        onChange(option)
        setIsOpen(false)
    }

    return (
        <div className="w-full relative max-w-sm my-1" ref={dropdownSearchRef}>
            <div
                className="px-4 py-2 cursor-pointer flex justify-between items-center 
                    rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-100 shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected ? `${selected.name} - ${selected.description}` : placeholder}
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <FaCaretDown />
                </span>
            </div>
            {isOpen && (
                <div className="fixed bg-white dark:bg-gray-900 dark:text-gray-100 z-50 rounded border border-gray-300 dark:border-gray-700 shadow-lg">
                    <input
                        type="text"
                        className="px-3 py-2 w-full border-b border-gray-300 dark:border-gray-700 focus:outline-none dark:bg-gray-950
                            focus:ring focus:ring-blue-200 dark:focus:ring-blue-700"
                        placeholder="Search..."
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`px-4 py-2 cursor-pointer transition-colors 
                                        border-t border-gray-200 dark:border-gray-700 hover:bg-blue-500 hover:text-white 
                                        ${option.name === selected?.name ? 'bg-blue-100 dark:bg-gray-500 font-semibold' : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.name} - {option.description}
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 px-4 py-2">No options found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropdownSearch