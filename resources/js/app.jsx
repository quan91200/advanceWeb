import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import i18next from './i18.js'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(
            <I18nextProvider i18n={i18next}>
                <App {...props} />
            </I18nextProvider>
        )
    },
    progress: {
        color: '#4B5563',
    },
})
