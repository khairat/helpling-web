import React, { FunctionComponent, HTMLAttributes } from 'react'

export const Spinner: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className
}) => (
  <>
    <div className={className} />

    <style jsx>{`
      div {
        height: 1.5em;
        position: relative;
        width: 1.5em;
      }

      div:before,
      div:after {
        border-radius: 100%;
        border: 2px solid transparent;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      div:before {
        animation: spinner 1s linear infinite;
        border-top-color: white;
        z-index: 1;
      }

      div:after {
        border-color: #666;
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
