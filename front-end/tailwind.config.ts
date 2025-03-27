import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|input|ripple|spinner|form).js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // WHITES
        'white': '#FFFFFF',
        'off-white': '#F1F1F1',
        // GRAYS
        'tint-gray': '#D1D5DB',
        'gray': '#6B7280',
        'shade-gray': '#1F232B',
        // BLACKS
        'tint-black': '#1F2937',
        'black': '#000000',
        'shade-black': '#111827',
        // PRIMARY COLOR BLUE
        'tint-blue': '#BFDBFE',
        'primary': '#3B82F6', // blue
        'shade-blue': '#1D4ED8',
        // COMPLEMENTARY COLOR ORANGE
        'tint-orange': '#FF6F00',
        'secondary': '#FF5722', //orange
        'shade-orange': '#FF3D00',
      },
      boxShadow: {
        'dark': '0px 4px 6px rgba(31, 41, 55, 0.15)', 
        'light': '0px 4px 6px rgba(255, 255, 255, 0.2)', 
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
