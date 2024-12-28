import { User } from "@prisma/client"
import jwt from "jsonwebtoken"

export function generateAccessToken(params: { user: User; expiresIn: string }) {
   const { user, expiresIn } = params
   return jwt.sign(user, process.env.JSON_ACCESS_TOKEN_SECRET, {
      expiresIn
   })
}

export function generateRefreshToken(params: { user: User; expiresIn: string }) {
   const { user, expiresIn } = params
   return jwt.sign(user, process.env.JSON_REFRESH_TOKEN_SECRET, {
      expiresIn
   })
}
