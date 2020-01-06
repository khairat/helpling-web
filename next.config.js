const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(
  withSass({
    env: {
      FIREBASE_CONFIG: process.env.FIREBASE_CONFIG
    }
  })
)
