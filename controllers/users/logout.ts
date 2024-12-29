import { Request, Response } from "express"
import RefreshTokenQuery from "../../queries/refreshToken"
import { log } from "node:console"

export default async function (req: Request, res: Response) {
   const { id } = req.context.user

   log("User logged out", req.context.user)

   res.cookie("accessToken", null, { httpOnly: true, sameSite: "none", secure: true })
   res.cookie("refreshToken", null, { httpOnly: true, sameSite: "none", secure: true })

   const refreshTokenQuery = new RefreshTokenQuery()

   const existingRefreshToken = await refreshTokenQuery.readByUserId(id)

   if (existingRefreshToken) {
      await refreshTokenQuery.delete(existingRefreshToken.token)
   }

   res.status(200).send()
}
