import React from 'react'
import { FaFacebook, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa"
import ApplicationLogo from "@/Components/ApplicationLogo"
import { useTranslation } from "react-i18next"

const Footer = () => {
    const { t } = useTranslation()
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="grid md:grid-cols-4 gap-8 dark:text-gray-200">
                {/* Logo + Giới thiệu */}
                <div>
                    <div>
                        <ApplicationLogo className="block h-10 w-auto fill-current text-blue-500 dark:text-blue-600" title="CobhamSocial" />
                    </div>
                    <p className="mt-2">
                        {t('footer.desc')}
                    </p>
                </div>

                {/* Điều hướng */}
                <div>
                    <h3 className="font-semibold mb-2 dark:text-white">Menu</h3>
                    <ul className="space-y-2">
                        <li><a target='_blank' rel='noreferrer' href="https://cv-web-xi-seven.vercel.app/" className="hover:text-blue-500">{t("footer.about")}</a></li>
                        <li><a target='_blank' rel='noreferrer' href="https://cv-web-xi-seven.vercel.app/contact" className="hover:text-blue-500">{t("footer.contact")}</a></li>
                        <li><a target='_blank' rel='noreferrer' href={route('users.privacy')} className="hover:text-blue-500">{t("footer.privacy")}</a></li>
                        <li><a target='_blank' rel='noreferrer' href={t('title.terms')} className="hover:text-blue-500">{t("footer.terms")}</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 dark:text-white">Other</h3>
                    <ul className="space-y-2">
                        <li><a target='_blank' rel='noreferrer' href="https://booklib-web.vercel.app/" className="hover:text-blue-500">{t("footer.booklib")}</a></li>
                        <li><a target='_blank' rel='noreferrer' href="https://coollgame-web.vercel.app/" className="hover:text-blue-500">{t("footer.coolgame")}</a></li>
                        <li><a target='_blank' rel='noreferrer' href="https://voyage-vibes-orpin.vercel.app/" className="hover:text-blue-500">{t("footer.voyagevibes")}</a></li>
                        <li><a target='_blank' rel='noreferrer' href="https://course-web-nine.vercel.app/" className="hover:text-blue-500">{t("footer.academia")}</a></li>
                    </ul>
                </div>

                {/* Mạng xã hội */}
                <div>
                    <h3 className="font-semibold mb-2 dark:text-white">{t("footer.followUs")}</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 dark:text-gray-400">
                            <FaFacebook size={24} className="animate-pulse text-blue-600" />
                        </a>
                        <a href="#" className="text-gray-600 dark:text-gray-400">
                            <FaLinkedin size={24} className="animate-pulse text-blue-500" />
                        </a>
                        <a href="#" className="text-gray-600 dark:text-gray-400">
                            <FaGithub size={24} className="animate-pulse text-violet-600" />
                        </a>
                        <a href="#" className="text-gray-600 dark:text-gray-400">
                            <FaYoutube size={24} className="animate-pulse text-red-600" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bản quyền */}
            <div className="mt-8 border-t dark:border-gray-700 pt-4 text-center dark:text-gray-200">
                © {new Date().getFullYear()} <span className="text-blue-600 font-bold">CobhamSocial</span>. All rights reserved.
            </div>
        </div>
    )
}

export default Footer