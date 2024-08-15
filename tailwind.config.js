/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'custom-gradient':
                    'linear-gradient(to bottom right, #BACAE8 40%, #C7CEC3, #E7B1A6, #DAB482, #D9C054)',
            },
            boxShadow: {
                'box-border': {
                    boxSizing: 'border-box',
                },
            },
        },
    },
    plugins: [],
};
