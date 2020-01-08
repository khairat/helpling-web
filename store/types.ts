import { firestore } from 'firebase'

export type RequestPaymentMethod = 'cashApp' | 'payPal' | 'venmo'
export type RequestStatus = 'pending' | 'complete'
export type RequestType = 'food' | 'invite' | 'money' | 'physical'

export interface Request {
  id: string
  cashRequired?: number
  description: string
  paymentEmail?: string
  paymentMethod?: RequestPaymentMethod
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
