import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => {
  const { asPath } = useRouter()

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
    <footer className="m-8 text-gray-500 text-sm leading-none flex">
      <p className="m-0">&copy; {new Date().getFullYear()} / Helpling</p>
      <nav className="flex flex-col ml-8">
        {links.map(({ label, link }, index) => (
          <Link key={index} href={link}>
            <a
              className={clsx(
                'first:mt-0',
                'hover:text-secondary',
                'mt-4',
                'text-gray-400',

                asPath.indexOf(link) === 0 && 'text-secondary font-medium'
              )}>
              {label}
            </a>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
