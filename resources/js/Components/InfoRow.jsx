const InfoRow = ({ label, value, capitalize = false, lowercase = false }) => {
    const textStyle = `${capitalize ? "capitalize" : ""} ${lowercase ? "lowercase" : ""}`
    return (
        <p className={`flex items-start gap-2 ${textStyle}`}>
            <span className="font-medium dark:text-white capitalize">{label}:</span>
            <span>{value}</span>
        </p>
    )
}

export default InfoRow  