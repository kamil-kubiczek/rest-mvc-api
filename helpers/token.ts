import { User } from "@prisma/client"
import jwt, { JwtPayload } from "jsonwebtoken"

export function generateAccessToken(params: { userId: User["id"]; expiresIn: string }) {
   const { userId, expiresIn } = params
   return jwt.sign(userId, process.env.JSON_ACCESS_TOKEN_SECRET, {
      expiresIn
   })
}

export function generateRefreshToken(params: { userId: User["id"]; expiresIn: string }) {
   const { userId, expiresIn } = params
   return jwt.sign(userId, process.env.JSON_REFRESH_TOKEN_SECRET, {
      expiresIn
   })
}

export function verifyAccessToken(token: string) {
   return <
      JwtPayload & {
         id: User["id"]
      }
   >jwt.verify(token, process.env.JSON_ACCESS_TOKEN_SECRET)
}
