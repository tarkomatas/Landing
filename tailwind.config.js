/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./*.html", "./assets/*.js"],
    theme: {
        extend: {
            colors: {
                "primary": "#8420cf",
                "primary-text": "#8421D1",
                "accent": "#70E2D9",
                "accent-foreground": "#151117",
                "background-light": "#ffffff",
                "background-dark": "#1a1a1a",
                "secondary-bg": "#f5f5f5",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "body": ["Manrope", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/container-queries"),
    ],
};
