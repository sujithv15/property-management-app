/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'color-darker': 'var(--COLOR-BG-DARKER)',
        'color-dark': 'var(--COLOR-BG-DARK)',
        'color': 'var(--COLOR-BG)',
        'primary-color': 'var(--COLOR)',
        'select-color': 'var(--COLOR-SELECT)'
      },
      header: {
        center: true
      }
    },
  },
  plugins: [],

}

