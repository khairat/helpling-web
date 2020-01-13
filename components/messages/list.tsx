import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

import { img_request_types } from '../../assets'
import { Thread } from '../../store/types'
import { Spinner } from '../spinner'

interface Props {
  loading: boolean
  threadId: string
  threads: Thread[]
  userId: string

  onChange: (threadId: string) => void
}

export const List: FunctionComponent<Props> = ({
  loading,
  onChange,
  threadId,
  threads,
  userId
}) => (
  <aside
    id="list"
    className={clsx(
      'bg-primary',
      'flex-col',
      'flex',
      'overflow-hidden',
      'rounded',
      'w-64',

      threads.length === 0 && 'items-center justify-center'
    )}>
    {loading && threads.length === 0 && <Spinner className="m-8" />}
    {!loading && threads.length === 0 && <p>No messages yet.</p>}
    {threads.map(({ id, request, users }, index) => (
      <a
        key={index}
        className={clsx(
          'flex',
          'items-center',
          'justify-between',
          'p-4',

          threadId === id && 'bg-accent text-white'
        )}
        href={`/messages?thread=${id}`}
        onClick={event => {
          event.preventDefault()

          onChange(id)
        }}>
        {users
          .filter(({ id }) => id !== userId)
          .map(({ name }) => name)
          .join(', ')}
        <img
          className="h-8 w-8 ml-4"
          alt={request.type}
          src={img_request_types[request.type]}
        />
      </a>
    ))}
  </aside>
)
