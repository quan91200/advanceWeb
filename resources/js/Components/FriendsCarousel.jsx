import React from "react"
import Carousel from "@/Components/Carousel"
import { Link } from "@inertiajs/react"
import Button from "@/Components/Button"

const FriendsCarousel = ({ notFriends }) => {
    const groupedFriends = []
    const chunkSize = 3
    for (let i = 0; i < notFriends.length; i += chunkSize) {
        groupedFriends.push(notFriends.slice(i, i + chunkSize))
    }
    const friendTabs = groupedFriends.map((group, index) => (
        <div key={index} className="flex justify-center gap-4">
            {group.map((nf) => (
                <div key={nf.id} className="bg-gray-500 rounded-md shadow-lg w-44">
                    <div className="flex flex-col">
                        <div className="w-full h-44">
                            <img
                                alt="not friend"
                                src={`/storage/${nf.profile_pic}` || "/default-avatar.png"}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                        <div className="m-2 flex flex-col items-center space-y-2">
                            <Link href={route("users.show", nf.id)}>
                                <p className="hover:underline">{nf.name}</p>
                            </Link>
                            <Button variant="info">Add Friend</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ))

    return (
        <div className="my-2">
            {friendTabs.length > 0 ? (
                <Carousel images={friendTabs} autoSlide={false} />
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    No suggestions available.
                </p>
            )}
        </div>
    )
}

export default FriendsCarousel