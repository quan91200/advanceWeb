import React from 'react'
import Button from './Button'
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md'

const Pagination = ({
    totalPages = 1,
    currentPage = 1,
    onPageChange,
    maxPageDisplay = 5,
}) => {
    const getPageNumbers = () => {
        const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);
        let startPage = Math.max(1, currentPage - halfMaxPageDisplay);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageDisplay);

        if (currentPage - halfMaxPageDisplay <= 0) {
            endPage = Math.min(totalPages, endPage + (halfMaxPageDisplay - currentPage + 1));
        }

        if (totalPages - currentPage < halfMaxPageDisplay) {
            startPage = Math.max(1, startPage - (halfMaxPageDisplay - (totalPages - currentPage)));
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center my-4">

            <Button
                variant="info"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <MdOutlineSkipPrevious />
            </Button>

            {pageNumbers[0] > 1 && (
                <>
                    <ButtonNumber onClick={() => onPageChange(1)}>1</ButtonNumber>
                    {pageNumbers[0] > 2 && <span className="mx-1 text-gray-500">...</span>}
                </>
            )}

            {pageNumbers.map((number) => (
                <ButtonNumber
                    key={number}
                    className={`${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} 
            border-2 border-blue-500 mx-1 cursor-pointer rounded`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </ButtonNumber>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                        <span className="mx-1 text-gray-500">...</span>
                    )}
                    <ButtonNumber onClick={() => onPageChange(totalPages)}>{totalPages}</ButtonNumber>
                </>
            )}

            <Button
                variant="info"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <MdOutlineSkipNext />
            </Button>
        </div>
    )
}

export default Pagination

const ButtonNumber = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded ${className} hover:bg-blue-100`}
        >
            {children}
        </button>
    )
}