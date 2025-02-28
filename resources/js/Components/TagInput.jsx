import React, { useState } from 'react'
import TextInput from './TextInput'
import { IoMdClose } from "react-icons/io"

const TagInput = ({ tags = [], onTagsChange }) => {
    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
            e.preventDefault()
            const newTag = inputValue.trim()
            if (!tags.includes(newTag)) {
                onTagsChange([...tags, newTag])
                setInputValue('')
            }
        }
    }
    const handleTagDelete = (tagToDelete) => {
        onTagsChange(tags.filter((tag) => tag !== tagToDelete))
    }
    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 p-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            className="text-white hover:text-gray-400"
                            onClick={() => handleTagDelete(tag)}
                        >
                            <IoMdClose />
                        </button>
                    </span>
                ))}
                <TextInput
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag..."
                />
            </div>
        </div>
    )
}

export default TagInput