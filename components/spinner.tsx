import React, { FunctionComponent, HTMLAttributes } from 'react'

export const Spinner: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className
}) => (
  <>
    <div className={className} />

    <style jsx>{`
      div {
        animation: spinner 1s linear infinite;
        border-radius: 100%;
        border: 2px solid white;
        border-top-color: transparent;
        height: 1.5em;
        width: 1.5em;
      }

      @keyframes spinner {
        from {
          transform: rotate(0);
        }

        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </>
)
