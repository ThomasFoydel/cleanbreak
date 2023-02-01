import NextAuth from 'next-auth'
import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import connection from '../../../Mongo/connection'
import User from '../../../Mongo/models/User'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await connection()

        const result = await User.findOne({ email: credentials.email }).select(
          '+password'
        )
        if (!result) {
          throw new Error('User not found')
        }

        const passwordMatch = await compare(
          credentials.password,
          result.password
        )

        if (!passwordMatch) {
          throw new Error("Username or Password doesn't match")
        }

        return {
          email: result.email,
          name: result.name
        }
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  }
})
