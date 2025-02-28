import InfoRow from "@/Components/InfoRow"

const UserInfo = ({ user }) => {
    console.log(user)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
            <InfoRow label="Email" value={user.email || ""} lowercase />
            <InfoRow
                label="Bio"
                value={user.profile?.bio || "Bio is not set yet"}
                capitalize
            />
            <InfoRow
                label="Date of Birth"
                value={user.profile?.dob || "YYY-mm-DD"}
            />
            <InfoRow
                label="Job"
                value={user.profile?.job || "Job is not set yet"}
                capitalize
            />
            <InfoRow
                label="Phone"
                value={user.profile?.phone_number || "+xx"}
            />
            <InfoRow
                label="Relationship"
                value={user.profile?.relationship || "Relationship is not set yet"}
                capitalize
            />
            <InfoRow
                label="Hobbies"
                value={
                    user.hobbies?.map((hobby) => (
                        <span key={hobby.id} className="ml-1">
                            {hobby.name}
                        </span>
                    )) || "No hobbies set yet"
                }
            />
        </div>
    )
}

export default UserInfo
