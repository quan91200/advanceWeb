import React, { useEffect, useState } from 'react'
import { GrFormPrevious } from "react-icons/gr"
import { GrFormNext } from "react-icons/gr"

const Carousel = ({ images, autoSlide = true, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                nextSlide()
            }, interval)
            return () => clearInterval(slideInterval)
        }
    }, [autoSlide, interval])

    return (
        <div className="overflow-hidden relative w-full">
            <div className="flex items-center relative w-full">
                <button
                    className="hover:bg-gray-800 rounded-full text-white p-2 absolute left-2 z-[2]"
                    onClick={prevSlide}
                >
                    <GrFormPrevious size={25} />
                </button>
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: "100%",
                    }}
                >
                    {images.map((content, index) => (
                        <div
                            key={index}
                            className="flex-grow flex-shrink-0 basis-full flex items-center justify-center"
                            style={{
                                minWidth: "100%",
                            }}
                        >
                            {content}
                        </div>
                    ))}
                </div>
                <button
                    className="hover:bg-gray-800 rounded-full text-white p-2 z-[2] absolute right-2"
                    onClick={nextSlide}
                >
                    <GrFormNext size={25} />
                </button>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`h-3 w-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel  
