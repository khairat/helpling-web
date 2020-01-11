import React, { FunctionComponent, useState } from 'react'

interface Props {
  onReply: (body: string) => void
}

export const Reply: FunctionComponent<Props> = ({ onReply }) => {
  const [body, setBody] = useState('')

  return (
    <footer className="bg-gray-800">
      <input
        className="bg-gray-800 w-full"
        onChange={event => setBody(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' && body.trim()) {
            onReply(body.trim())

            setBody('')
          }
        }}
        placeholder="Say something nice"
        value={body}
      />
    </footer>
  )
}
