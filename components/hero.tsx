import React, { FunctionComponent, HTMLAttributes } from 'react'

export const Hero: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className
}) => (
  <section
    className={`hero -mx-8 flex-col flex items-center justify-center my-8 px-8 py-32 relative ${className}`}>
    {children}
  </section>
)
