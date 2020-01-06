import { firestore } from 'firebase'

export type RequestType = 'food' | 'invite' | 'money' | 'physical'

export interface Request {
  id: string
  description: string
  type: RequestType
  user: {
    id: string
    name: string
    city: string
    country: string
  }
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}
