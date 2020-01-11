import { firestore } from 'firebase/app'

export type RequestPaymentMethod = 'cashApp' | 'payPal' | 'venmo'
export type RequestStatus = 'pending' | 'accepted' | 'complete'
export type RequestType = 'food' | 'invite' | 'money' | 'physical'

export interface Request {
  id: string
  cashRequired?: number
  description: string
  helper?: firestore.DocumentReference<User>
  _helper?: User
  paymentLink?: string
  paymentMethod?: RequestPaymentMethod
  status: RequestStatus
  type: RequestType
  user: firestore.DocumentReference<User>
  _user?: User
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export interface Thread {
  id: string
  users: firestore.DocumentReference<User>[]
  _users: User[]
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export interface Message {
  id: string
  body: string
  user: firestore.DocumentReference<User>
  _user: User
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
