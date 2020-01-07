import Link from 'next/link'
import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => {
  const links = [
    {
      label: 'Browse',
      link: '/browse'
    },
    {
      label: 'About',
      link: '/about'
    },
    {
      label: 'Privacy policy',
      link: '/privacy'
    }
  ]
  return (
    <footer className="m-8 text-gray-600 text-sm leading-none flex">
      <p className="m-0">&copy; {new Date().getFullYear()} / Helpling</p>
      <nav className="flex flex-col ml-8">
        {links.map(({ label, link }, index) => (
          <Link key={index} href={link}>
            <a className="text-gray-500 mt-4 first:mt-0 hover:text-accent">
              {label}
            </a>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
