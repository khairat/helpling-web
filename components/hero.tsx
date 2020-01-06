import clsx from 'clsx'
import React, { FunctionComponent, HTMLAttributes } from 'react'

export const Hero: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className
}) => (
  <>
    <section
      className={clsx(
        '-mx-8',
        'flex-col',
        'flex',
        'items-center',
        'justify-center',
        'my-8',
        'px-8',
        'py-32',
        'relative',

        className
      )}>
      {children}
    </section>

    <style jsx>{`
      section:before {
        background: #010f28;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      section:nth-child(odd):before {
        clip-path: polygon(0 5em, 100% 0, 100% calc(100% - 5em), 0 100%);
      }

      section:nth-child(even):before {
        clip-path: polygon(0 0, 100% 5em, 100% 100%, 0 calc(100% - 5em));
      }
    `}</style>
  </>
)
