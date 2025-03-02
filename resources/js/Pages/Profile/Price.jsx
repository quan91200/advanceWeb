import React, { useState } from "react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { FaUser, FaUsers, FaBriefcase } from "react-icons/fa"
import { MdCheck, MdClose, MdExpandMore } from "react-icons/md"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { VscVerifiedFilled } from "react-icons/vsc"
import Footer from "@/Components/Footer"

const plansData = [
    {
        id: "individual",
        icon: <FaUser size={32} />,
        bg: "bg-blue-500"
    },
    {
        id: "communicate",
        icon: <FaUsers size={32} />,
        bg: "bg-green-500"
    },
    {
        id: "business",
        icon: <FaBriefcase size={32} />,
        bg: "bg-yellow-500"
    }
]

const Price = () => {
    const { t } = useTranslation()
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const faqs = [
        { question: t("faq.1.question"), answer: t("faq.1.answer") },
        { question: t("faq.2.question"), answer: t("faq.2.answer") },
        { question: t("faq.3.question"), answer: t("faq.3.answer") }
    ]

    const features = [
        { key: "accessContent", free: true, premium: true },
        { key: "noAds", free: false, premium: true },
        { key: "offlineDownload", free: false, premium: true },
        { key: "prioritySupport", free: false, premium: true },
        { key: "advancedAPI", free: false, premium: true },
    ]
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-bold text-2xl dark:text-yellow-600 flex items-center justify-center w-full space-x-2"><VscVerifiedFilled /> <span>CS Premium</span></h2>
            }
            footer={
                <Footer />
            }
        >
            <Head title="Pricing" />
            <div className="max-w-6xl mx-auto pt-16 px-4">
                {/* Bảng so sánh Free vs Premium */}
                <div className="my-10 max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold text-center dark:text-white text-gray-800 mb-6">
                        {t("common.pricingTitle")}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border dark:border-gray-700 border-gray-300">
                            <thead>
                                <tr className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white">
                                    <th className="p-4 text-left">{t("pricing.features.accessContent")}</th>
                                    <th className="p-4 text-center">{t("plans.free")}</th>
                                    <th className="p-4 text-center bg-blue-500 text-white">{t("plans.premium")}</th>
                                </tr>
                            </thead>
                            <tbody className="dark:text-gray-300 text-gray-800">
                                {features.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b dark:border-gray-700 border-gray-300 ${index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : ""
                                            }`}
                                    >
                                        <td className="p-4">{t(`pricing.features.${item.key}`)}</td>
                                        <td className="pl-8 text-center">
                                            {item.free ? <MdCheck size={24} className="text-green-500" /> : <MdClose size={24} className="text-red-500" />}
                                        </td>
                                        <td className="p-4 text-center flex justify-center">
                                            {item.premium ? <MdCheck size={24} className="text-green-500" /> : <MdClose size={24} className="text-red-500" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center dark:text-white text-gray-800 mb-8">
                    {t('common.chose')}
                </h1>
                {/* Gói dịch vụ */}
                <div className="grid md:grid-cols-3 gap-8">
                    {plansData.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            className="border dark:border-gray-700 border-gray-300 rounded-lg p-6 shadow-lg dark:bg-gray-800 bg-gray-100"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }} // Delay từng thẻ
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.15)" }}
                        >
                            <div className={`flex items-center justify-center ${plan.bg} p-3 rounded-lg text-white`}>
                                {plan.icon}
                            </div>
                            <h2 className="text-xl font-bold mt-4 dark:text-white text-gray-800">{t(`plans.${plan.id}.name`)}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">{t(`plans.${plan.id}.description`)}</p>
                            <p className="text-2xl font-bold text-blue-500 mt-4">{t(`plans.${plan.id}.price`)}</p>

                            <ul className="mt-4 space-y-2">
                                {t(`plans.${plan.id}.features`, { returnObjects: true }).map((feature, index) => (
                                    <li key={index} className="text-gray-700 dark:text-gray-300">✅ {feature}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                {/* FAQ - Câu hỏi thường gặp */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-center dark:text-white text-gray-800 mb-6">
                        {t("common.faqTitle")}
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border dark:border-gray-700 border-gray-300 rounded-lg">
                                <button
                                    className="w-full flex justify-between items-center p-4 dark:bg-gray-800 bg-gray-200"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-gray-800 dark:text-white font-medium">{faq.question}</span>
                                    <MdExpandMore
                                        size={24}
                                        className={`transition-transform dark:text-gray-200 duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="p-4 dark:bg-gray-900 bg-gray-100 text-gray-700 dark:text-gray-300">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Price