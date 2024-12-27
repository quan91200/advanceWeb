// resources/js/i18n.js
import i18next from "i18next"
import { EN, VN } from './translations/index'

i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
        en: {
            global: EN,
        },
        vn: {
            global: VN,
        }
    }
})

export default i18next