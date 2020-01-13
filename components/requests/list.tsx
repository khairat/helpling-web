import { startCase } from 'lodash'
import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent, ReactNode } from 'react'

import { img_request_types } from '../../assets'
import { Request } from '../../store/types'
import { Spinner } from '../spinner'

interface Props {
  empty: ReactNode
  loading: boolean
  requests: Request[]
}

export const List: FunctionComponent<Props> = ({
  empty,
  loading,
  requests
}) => (
  <>
    {loading && <Spinner className="mt-4" />}
    {!loading && requests.length === 0 && empty}
    {!loading && requests.length > 0 && (
      <div className="bg-primary overflow-auto rounded">
        <table>
          <thead>
            <tr>
              <th>Request</th>
              <th className="text-center">Type</th>
              <th>Status</th>
              <th>Posted</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(
              ({ createdAt, description, id, status, type }, index) => (
                <tr key={index}>
                  <td>
                    <Link href={`/requests/${id}`}>
                      <a>{description}</a>
                    </Link>
                  </td>
                  <td>
                    <img
                      alt={type}
                      className="h-8 w-8 m-auto"
                      src={img_request_types[type]}
                      title={type}
                    />
                  </td>
                  <td>{startCase(status)}</td>
                  <td className="whitespace-no-wrap">
                    {moment(createdAt.toDate()).fromNow()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )}
  </>
)
