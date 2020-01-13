import { firestore } from 'firebase/app'

export type RequestPaymentMethod = 'cashApp' | 'payPal' | 'venmo'
export type RequestStatus = 'pending' | 'accepted' | 'complete'
export type RequestType = 'food' | 'invite' | 'money' | 'physical'

export interface Request {
  id: string
  cashRequired?: number
  description: string
  helpling?: User
  helplingId?: string
  paymentLink?: string
  paymentMethod?: RequestPaymentMethod
  status: RequestStatus
  thread?: Thread
  threadId?: string
  type: RequestType
  user: User
  userId: string
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export interface Thread {
  id: string
  request: Request
  requestId: string
  userIds: string[]
  users: User[]
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export interface Message {
  id: string
  body: string
  user: User
  userId: string
  createdAt: firestore.Timestamp
}

export interface User {
  id: string
  city: string
  country: string
  name: string
  createdAt: firestore.Timestamp
}

export enum RequestTypes {
  food = 'Food',
  invite = 'Invite',
  money = 'Money',
  physical = 'Physical'
}

export enum RequestPaymentMethods {
  cashApp = 'Cash App',
  payPal = 'PayPal',
  venmo = 'Venmo'
}
