import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

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
  <aside id="list" className="bg-primary flex flex-col w-64 skewed small">
    {loading && threads.length === 0 && <Spinner className="m-8" />}
    {!loading && threads.length === 0 && <p>No messages yet.</p>}
    {threads.map(({ _users, id }, index) => (
      <a
        key={index}
        className={clsx('p-4', threadId === id && 'bg-accent text-white')}
        href={`/messages?thread=${id}`}
        onClick={event => {
          event.preventDefault()

          onChange(id)
        }}>
        {_users
          .filter(({ id }) => id !== userId)
          .map(({ name }) => name)
          .join(', ')}
      </a>
    ))}
  </aside>
)
