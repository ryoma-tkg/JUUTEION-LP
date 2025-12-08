/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ["IBM Plex Sans JP", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Pure Blackではなく、わずかに温かみや青みのあるダークグレーを使用
                background: "#09090b", // Zinc-950: 深いマットな黒
                surface: "#18181b",    // Zinc-900: カード背景など
                subtle: "#27272a",     // Zinc-800: ボーダーや区切り線

                // 文字色
                "text-main": "#f4f4f5", // Zinc-100: ほぼ白
                "text-muted": "#a1a1aa", // Zinc-400: 控えめなグレー

                // Accent: 派手すぎない、知的なミントブルー
                primary: "#2dd4bf",    // Teal-400
            },
        },
    },
    plugins: [],
}