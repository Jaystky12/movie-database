import { AuthenticationError } from 'apollo-server-express'
import jsonwebtoken from 'jsonwebtoken'

const secret = process.env.SECRET ?? ''

export function validateJwtToken (jwtToken?: string): any {
  if (jwtToken == null) {
    throw new AuthenticationError('no jwt provided')
  }
  try {
    return jsonwebtoken.verify(jwtToken, secret, { algorithms: ['HS256'] })
  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      throw new AuthenticationError('jwt: ' + error.message)
    }
    throw error
  }
}