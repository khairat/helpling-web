import { firestore } from 'firebase'

export type RequestType = 'food' | 'invite' | 'money' | 'physical'
export type RequestStatus = 'pending' | 'complete'

export interface Request {
  id: string
  description: string
  status: RequestStatus
  type: RequestType
  user: firestore.DocumentReference<User>
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export interface User {
  id: string
  city: string
  country: string
  name: string
  payPalEmail?: string
  createdAt: firestore.Timestamp
}

export enum RequestTypes {
  food = 'Food',
  invite = 'Invite',
  money = 'Money',
  physical = 'Physical'
}
