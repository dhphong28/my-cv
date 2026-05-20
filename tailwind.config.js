/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Fraunces', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['Monaco', 'Menlo', 'monospace'],
      },
      colors: {
        'text': '#6b6375',
        'text-h': '#08060d',
      },
      spacing: {
        'section': '4rem',
      },
    },
  },
  plugins: [],
}
