const pseudo = require('tailwindcss-pseudo')

module.exports = {
  plugins: [pseudo()],
  theme: {
    extend: {
      colors: {
        accent: '#fe6458',
        modal: 'rgba(0, 0, 0, 0.85)',
        primary: '#1a273e',
        'primary-dark': '#010f28'
      },
      fontFamily: {
        sans: [
          'CircularStd',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji'
        ]
      },
      width: {
        signin: '20rem'
      }
    }
  },
  variants: {}
}
