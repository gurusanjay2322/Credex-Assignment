/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#1F2937',
          dark: '#374151',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#111827',
        },
        text: {
          DEFAULT: '#1F2937',
          dark: '#F9FAFB',
        },
        accent: {
          DEFAULT: '#34D399',
          dark: '#34D399',
        },
        card: {
          DEFAULT: '#F3F4F6',
          dark: '#1F2937',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
} 