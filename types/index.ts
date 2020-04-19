export type UserType = {
  id: string
  city: string
  country: string
  name: string
}

export type RequestType = {
  id: string
  city: string
  country: string
  description: string
  helpling?: UserType
  status: RequestStatusType
  threadId?: string
  type: RequestTypeType
  user: UserType
  createdAt: string
  updatedAt: string
}

export type RequestStatusType = 'pending' | 'accepted' | 'completed'

export type RequestTypeType = 'food' | 'invite' | 'money' | 'physical'

export type CommentType = {
  id: string
  body: string
  user: UserType
  createdAt: string
}
