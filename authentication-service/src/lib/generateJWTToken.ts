import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET ?? ''

export function generateJWTToken (sessionId: string, user: Express.User): string {
  return jwt.sign({ sessionId, user }, secretKey, { algorithm: 'PS384', expiresIn: '1h' })
}
