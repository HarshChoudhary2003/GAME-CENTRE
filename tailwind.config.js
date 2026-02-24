/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-deep': '#050508',
                'bg-surface': 'rgba(15, 15, 25, 0.6)',
                'primary': '#00ffaa',
                'secondary': '#0088ff',
                'accent': '#ff0055',
                'text-dim': '#94a3b8',
            },
            scale: {
                '102': '1.02',
            }
        },
    },
    plugins: [],
}
