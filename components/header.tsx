import Link from 'next/link'
import React, { FunctionComponent, useState } from 'react'

import { NavLink } from './nav-link'

export const Header: FunctionComponent = () => {
  const [visible, setVisible] = useState(false)

  return (
    <header className="flex items-stretch justify-between">
      <Link href="/">
        <a className="flex items-center text-white">
          <img
            className="h-12 w-12 my-8 ml-8 mr-4"
            src="/img/helpling.svg"
            alt="Helpling"
          />
          <span className="text-xl font-medium mr-8">Helpling</span>
        </a>
      </Link>
      <a
        className={`lg:hidden right-0 top-0 z-20 ${
          visible ? 'fixed' : 'absolute'
        }`}
        href="#menu"
        onClick={(event) => {
          event.preventDefault()

          setVisible(!visible)
        }}>
        <img
          className="h-6 m-8 w-6"
          src={`/img/menu_${visible ? 'close' : 'open'}.svg`}
          alt="Menu"
        />
      </a>
      <nav
        className={`bg-modal fixed flex-col inset-0 justify-center overflow-y-auto right-0 top-0 z-10 ${
          visible ? 'flex' : 'hidden'
        } lg:bg-transparent lg:flex lg:flex-row lg:static`}>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/privacy">Privacy policy</NavLink>
      </nav>
    </header>
  )
}
