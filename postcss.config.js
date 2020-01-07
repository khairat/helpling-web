const env = require('postcss-preset-env')
const nano = require('cssnano')
const tailwind = require('tailwindcss')

module.exports = {
  plugins: [tailwind, env, nano]
}
