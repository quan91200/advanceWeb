import React from "react"

export default function CheckboxGroup({ options, selected, onChange }) {
    const handleCheckboxChange = (id) => {
        if (selected.includes(id)) {
            onChange(selected.filter((hobbyId) => hobbyId !== id))
        } else {
            onChange([...selected, id])
        }
    }

    return (
        <ul className="space-y-2">
            {options.map((option) => (
                <li key={option.id}>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selected.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-indigo-600 dark:focus:ring-indigo-600"
                        />
                        <span className="text-gray-900 dark:text-gray-300">
                            {option.name}
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    )
}