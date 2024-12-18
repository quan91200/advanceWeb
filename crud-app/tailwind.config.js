import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
    safelist: [
        'text-red-500', 'text-gray-500', 'text-blue-500', 'text-green-500', 'text-yellow-500',
        'bg-red-500', 'bg-gray-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
        'hover:bg-red-500', 'hover:bg-gray-500', 'hover:bg-blue-500', 'hover:bg-green-500', 'hover:bg-yellow-500',
        'hover:text-red-500', 'hover:text-gray-500', 'hover:text-blue-500', 'hover:text-green-500', 'hover:text-yellow-500',
        'hover:border-red-500', 'hover:border-gray-500', 'hover:border-blue-500', 'hover:border-green-500', 'hover:border-yellow-500',
        'text-white', 'bg-transparent', 'hover:text-white', 'hover:border-transparent', 'hover:bg-transparent'
    ],
};
