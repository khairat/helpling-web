import { NextPage } from 'next'

import { firebase, redirect } from '../lib'

const SignOut: NextPage = () => null

SignOut.getInitialProps = async context => {
  await firebase.auth().signOut()

  redirect(context, '/')

  return {}
}

export default SignOut
