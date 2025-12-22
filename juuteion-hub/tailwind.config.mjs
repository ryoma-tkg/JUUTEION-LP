/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                // 基本の和文フォント (IBM Plex Sans JP)
                sans: ["IBM Plex Sans JP", ...defaultTheme.fontFamily.sans],
                // 欧文・数字用フォント (Montserrat) - 見出しや英語のみの箇所に使用
                en: ["Montserrat", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: "#09090b",
                surface: "#18181b",
                subtle: "#27272a",
                timeline: "#3e3e42",
                "text-main": "#f4f4f5",
                "text-muted": "#dadae6",
                "accent-blue": "#0097e0",
                "accent-yellow": "#FEE100",
                "accent-red": "#e5177c",
            },
        },
    },
    plugins: [],
}