import { FaChevronUp, FaChevronDown } from "react-icons/fa"

const SortButton = ({
    field,
    label,
    sort = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => { },
}) => {
    return (
        <button
            onClick={() => sortChanged(field)}
            variant="info"
            className="flex items-center justify-between gap-1 px-3 py-2 rounded-lg outline-none transition-all duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700"
        >
            {label}
            {sort && (
                <div className="flex flex-col gap-1 items-center justify-center">
                    <FaChevronUp
                        className={
                            "w-4 transition-transform duration-200 " +
                            (sort_field === field && sort_direction === "asc"
                                ? "text-white"
                                : "text-gray-500") +
                            " hover:text-blue-500 hover:scale-110"
                        }
                    />
                    <FaChevronDown
                        className={
                            "w-4 -mt-2 transition-transform duration-200 " +
                            (sort_field === field && sort_direction === "desc"
                                ? "text-white"
                                : "text-gray-500") +
                            " hover:text-blue-500 hover:scale-110"
                        }
                    />
                </div>
            )}
        </button>
    )
}

export default SortButton