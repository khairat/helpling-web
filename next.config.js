const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(
  withSass({
    env: {
      FIREBASE_ADMIN_CONFIG: process.env.FIREBASE_ADMIN_CONFIG,
      FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL
    }
  })
)
