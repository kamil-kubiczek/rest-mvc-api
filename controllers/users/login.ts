import { Request, Response } from "express"
import UserQuery from "../../queries/user"
import bcrypt from "bcrypt"
import { User } from "@prisma/client"
import { generateAccessToken, generateRefreshToken } from "../../helpers/token"
import RefreshTokenQuery from "../../queries/refreshToken"

export default async function (req: Request<{}, {}, { email: User["email"]; password: User["password"] }>, res: Response) {
   const { email, password } = req.body
   const query = new UserQuery()

   const user = await query.readByEmailWithPasswordHash({
      email
   })

   if (!user || (user && !bcrypt.compareSync(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" })
      return
   }

   const accessToken = generateAccessToken({ userId: user.id, expiresIn: "15m" })
   const refreshToken = generateRefreshToken({ userId: user.id, expiresIn: "7d" })

   const refreshTokenQuery = new RefreshTokenQuery()

   const existingRefreshToken = await refreshTokenQuery.readByUserId(user.id)

   if (existingRefreshToken) {
      await refreshTokenQuery.delete(existingRefreshToken.token)
   }

   await refreshTokenQuery.create({ token: refreshToken, userId: user.id, createdAt: BigInt(new Date().getTime()) })

   res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none", secure: true })

   res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true })

   delete (user as unknown as Partial<typeof user>).password

   res.status(200).json(user)
}
