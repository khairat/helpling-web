import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => (
  <footer className="m-8">
    <p className="text-gray-600 text-sm m-0 leading-none">
      &copy; {new Date().getFullYear()} / Helpling
    </p>
  </footer>
)
