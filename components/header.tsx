import Link from 'next/link'
import React, { FunctionComponent } from 'react'

export const Header: FunctionComponent = () => (
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
  </header>
)
