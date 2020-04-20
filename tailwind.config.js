module.exports = {
  theme: {
    extend: {
      colors: {
        accent: '#fe6458',
        modal: 'rgba(0, 0, 0, 0.85)',
        primary: '#1a273e',
        'primary-dark': '#010f28',
        secondary: '#ea5167',
        'status-accepted': '#007aff',
        'status-completed': '#4cd964',
        'status-pending': '#ff9500'
      },
      fontFamily: {
        sans: [
          'Inter',
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
        item: '48rem'
      }
    }
  },
  variants: {
    margin: ['responsive', 'first', 'last']
  }
}
