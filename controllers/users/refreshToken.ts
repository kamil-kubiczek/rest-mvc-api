import { Request, Response } from "express"
import { generateAccessToken, verifyRefreshToken } from "../../helpers/token"

export default function (req: Request, res: Response) {
   const refreshToken = req.cookies["refreshToken"]

   if (!refreshToken) {
      res.status(401).json({ error: "Unauthorized. Token invalid or expired" })
      return
   }

   const decodedToken = verifyRefreshToken(refreshToken)

   if (!decodedToken || !decodedToken.userId) {
      res.status(401).json({ error: "Unauthorized. Token invalid or expired" })
      return
   }

   const accessToken = generateAccessToken({ userId: decodedToken.userId, expiresIn: "15m" })

   res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none", secure: true })

   res.status(200).send()
}
