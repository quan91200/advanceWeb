import InfoRow from "@/Components/InfoRow"
import { useTranslation } from "react-i18next"

const UserInfo = ({ user }) => {
    const { t } = useTranslation()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 dark:text-gray-300">
            <InfoRow label={t('desc.profile.email')} value={user.email || ""} lowercase />
            <InfoRow
                label={t('title.bio')}
                value={user.profile?.bio || t('desc.bio')}
                capitalize
            />
            <InfoRow
                label={t('title.dob')}
                value={user.profile?.dob || "YYY-mm-DD"}
            />
            <InfoRow
                label={t('title.job')}
                value={user.profile?.job || t('desc.job')}
                capitalize
            />
            <InfoRow
                label={t('title.phone')}
                value={user.profile?.phone_number || "+xx"}
            />
            <InfoRow
                label={t('title.relationship')}
                value={user.profile?.relationship || t('desc.relationship')}
                capitalize
            />
            <InfoRow
                label={t('title.hobbies')}
                value={
                    user.hobbies?.map((hobby) => (
                        <span key={hobby.id} className="ml-1">
                            {hobby.name}
                        </span>
                    )) || t('desc.hobbies')
                }
            />
        </div>
    )
}

export default UserInfo
