import '../assets/global.scss'

import App from 'next/app'
import React from 'react'

export default class Helpling extends App {
  render() {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}
