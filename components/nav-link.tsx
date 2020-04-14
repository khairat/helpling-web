import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react'

export const NavLink: FunctionComponent<
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ children, href, ...props }) => (
  <Link href={href}>
    <a
      {...props}
      className={`nav-link flex font-semibold items-center justify-center p-10 relative text-3xl text-white lg:font-normal lg:px-8 lg:py-0 lg:text-base ${
        useRouter().asPath.indexOf(href.toString()) === 0 ? 'active' : ''
      }`}>
      {children}
    </a>
  </Link>
)
