import { firestore } from 'firebase'

export type RequestType = 'food' | 'invite' | 'money' | 'physical'

export interface Request {
  id: string
  description: string
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
