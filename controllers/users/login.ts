import { Request, Response } from "express"
import UserQuery, { CreateUserQueryInput } from "../../queries/user"
import bcrypt from "bcrypt"
import { User } from "@prisma/client"
import { generateAccessToken, generateRefreshToken } from "../../helpers/token"
import RefreshTokenQuery from "../../queries/refreshToken"

export default async function (req: Request<{}, {}, { name: User["name"]; password: User["password"] }>, res: Response) {
   const { name, password } = req.body
   const query = new UserQuery()

   const user = await query.readByNameAndPassword({
      name,
      password
   })

   if (!user) {
      res.status(401).json({ message: "Invalid credentials" })
      return
   }

   if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: "Invalid credentials" })
      return
   }

   const accessToken = generateAccessToken({ user, expiresIn: "15m" })
   const refreshToken = generateRefreshToken({ user, expiresIn: "7d" })

   const refreshTokenQuery = new RefreshTokenQuery()

   await refreshTokenQuery.create({ token: refreshToken, userId: user.id, createdAt: BigInt(new Date().getTime()) })

   res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none", secure: true })

   res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true })

   res.status(200).json(user)
}
