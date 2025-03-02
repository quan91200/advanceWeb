import React, { useRef } from "react"
import project1 from "../../assets/project/project1.png"
import project2 from "../../assets/project/project2.png"
import project3 from "../../assets/project/project3.png"
import project4 from "../../assets/project/project4.png"
import project5 from "../../assets/project/project5.png"
import project6 from "../../assets/project/project6.png"

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useTranslation } from "react-i18next"

const projects = [
    { name: "CV Web", image: project1, link: "https://cv-web-xi-seven.vercel.app/" },
    { name: "Portfolio Web Design", image: project2, link: "https://portfolio-web-design-drab.vercel.app/" },
    { name: "Coolgame", image: project3, link: "https://coollgame-web.vercel.app/" },
    { name: "BookLib Web", image: project4, link: "https://booklib-web.vercel.app/" },
    { name: "Car Rental Web", image: project5, link: "https://car-rental-web-five.vercel.app/" },
    { name: "Weather Web", image: project6, link: "https://react-weather-app-teal-phi.vercel.app/" },
]

const ProjectCard = ({ name, image, link }) => (
    <a href={link} target="_blank" rel="noreferrer" className="block min-w-[250px] dark:hover:bg-gray-950 hover:bg-gray-200 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <img src={image} alt={name} className="w-full h-36 object-cover rounded-md" />
        <p className="text-center dark:text-white font-bold mt-2">{name}</p>
    </a>
)

const Project = () => {
    const { t } = useTranslation()
    const scrollRef = useRef(null)

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -800, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 800, behavior: "smooth" })
        }
    }

    return (
        <div className="relative max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-600 text-center my-2">
                {t('title.producsBy')} Cobham
            </h2>

            {/* Nút cuộn trái */}
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg z-10">
                <FaChevronLeft size={25} />
            </button>

            {/* Danh sách project có thể cuộn */}
            <div className="overflow-hidden">
                <ul ref={scrollRef} className="flex gap-4 p-3 my-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {projects.map((project, index) => (
                        <li key={index} className="w-[350px] snap-center">
                            <ProjectCard {...project} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Nút cuộn phải */}
            <button onClick={scrollRight} className="absolute right-0 top-1/2 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg z-10">
                <FaChevronRight size={25} />
            </button>
        </div>
    )
}

export default Project
