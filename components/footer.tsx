import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => (
  <footer className="m-8 text-gray-500 text-sm leading-none flex">
    <p className="m-0">&copy; {new Date().getFullYear()} / Helpling</p>
  </footer>
)
