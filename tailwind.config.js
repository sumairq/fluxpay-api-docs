/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Stripe "blurple" — links, active states, highlights.
        accent: {
          50: '#f0eefe',
          100: '#e6e1fd',
          200: '#cabffb',
          300: '#a794f8',
          400: '#7d63f4',
          500: '#533afd',
          600: '#4322e0',
          700: '#3a1fc0',
          800: '#2f1a99',
          900: '#281778',
          950: '#1a0e52',
        },
        // Stripe's exact neutral scale (from the Stripe design tokens).
        stripe: {
          page: '#F4F7FA', // 50
          hover: '#ECF1F6', // 100
          border: '#D4DEE9', // 200
          text: '#3c4257', // body (Stripe's rendered body color)
          head: '#1A2C44', // 950
          muted: '#667691', // 600
          faint: '#95A4BA', // 400
          100: '#ECF1F6',
          200: '#D4DEE9',
          300: '#BAC8DA',
          400: '#95A4BA',
          500: '#7D8BA4',
          600: '#667691',
          700: '#50617A',
          800: '#3C4F69',
          900: '#273951',
          950: '#1A2C44',
        },
        // Dark code panel — lighter header bar over a darker code body (Stripe).
        code: {
          bg: '#3e444f',
          header: '#505865',
          border: '#5a626f',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Ubuntu',
          'sans-serif',
        ],
        mono: [
          'Source Code Pro',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
