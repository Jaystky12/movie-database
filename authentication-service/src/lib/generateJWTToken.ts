import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET ?? ''

export function generateJWTToken (sessionId: string, user: Express.User): string {
  console.log(sessionId, user)
  return jwt.sign({ sessionId, user }, secretKey, { algorithm: 'HS256', expiresIn: '1h' })
}
