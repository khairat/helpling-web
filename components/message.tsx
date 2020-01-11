import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

interface Props {
  message: string
  type: 'error' | 'message' | 'success'
}

export const Message: FunctionComponent<Props> = ({ message, type }) => (
  <div
    className={clsx(
      'font-medium',
      'my-8',
      'p-4',
      'text-white',

      type === 'message' && 'bg-blue-500',
      type === 'error' && 'bg-red-500',
      type === 'success' && 'bg-green-500'
    )}>
    {message}
  </div>
)
