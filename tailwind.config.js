/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'background-color': '#FFFFFF',
                'secondary-background-color': '#FFD5C2',
                'primary': '#F28F3B',
                'secondary': '#C8553D',
                'cyan': '#588B8B',
            },
        },
    },
  plugins: [require('tailwindcss-primeui')],
}

