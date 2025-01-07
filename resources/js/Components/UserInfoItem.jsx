function UserInfoItem({ icon, label, value, bgColor, textColor, iconColor }) {
    return (
        <li className="flex items-center gap-4">
            <div className={`p-2 ${bgColor} rounded-full`}>
                <i className={`${icon} ${iconColor}`}></i>
            </div>
            <div>
                <p className={`text-gray-700 dark:text-gray-300`}>{label}</p>
                {Array.isArray(value) ? (
                    value.map((v, index) => (
                        <p key={index} className="font-medium text-gray-900 dark:text-white">{v}</p>
                    ))
                ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                )}
            </div>
        </li>
    )
}
export default UserInfoItem