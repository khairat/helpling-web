import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { Message, Request, Thread, User } from './types'

interface State {
  creating: boolean
  loading: boolean
  loadingMessages: boolean
  messages: Message[]
  sending: boolean
  threads: Thread[]
}
type StoreApi = StoreActionApi<State>

const initialState: State = {
  creating: false,
  loading: false,
  loadingMessages: false,
  messages: [],
  sending: false,
  threads: []
}

const actions = {
  fetch: (userId: string) => ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    firebase
      .firestore()
      .collection('threads')
      .where('userIds', 'array-contains', userId)
      .orderBy('updatedAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        const threads = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Thread[]

        await Promise.all(
          threads.map(async thread => {
            const users = await Promise.all(
              thread.userIds.map(async userId => {
                const user = await firebase
                  .firestore()
                  .collection('users')
                  .doc(userId)
                  .get()

                return {
                  id: user.id,
                  ...user.data()
                } as User
              })
            )

            thread.users = users
          })
        )

        await Promise.all(
          threads.map(async thread => {
            const request = await firebase
              .firestore()
              .collection('requests')
              .doc(thread.requestId)
              .get()

            thread.request = {
              id: request.id,
              ...request.data()
            } as Request
          })
        )

        setState({
          loading: false,
          threads
        })
      })
  },
  fetchMessages: (threadId: string) => ({ setState }: StoreApi) => {
    setState({
      loadingMessages: true
    })

    firebase
      .firestore()
      .collection('messages')
      .where('threadId', '==', threadId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        const messages = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[]

        await Promise.all(
          messages.map(async message => {
            const user = await firebase
              .firestore()
              .collection('users')
              .doc(message.userId)
              .get()

            message.user = {
              id: user.id,
              ...user.data()
            } as User
          })
        )

        setState({
          loadingMessages: false,
          messages
        })
      })
  },
  reply: (threadId: string, userId: string, body: string) => async ({
    setState
  }: StoreApi) => {
    setState({
      sending: true
    })

    await firebase
      .firestore()
      .collection('messages')
      .add({
        body,
        createdAt: new Date(),
        threadId,
        userId
      })

    setState({
      sending: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'messages'
})

export const useMessages = createHook(Store)
