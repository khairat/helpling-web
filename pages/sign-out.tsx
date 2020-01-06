import axios from 'axios'
import { NextPage } from 'next'

import { redirect } from '../lib'

const SignOut: NextPage = () => null

SignOut.getInitialProps = async context => {
  await axios({
    url: '/api/sign-out'
  })

  redirect(context, '/')

  return {}
}

export default SignOut
