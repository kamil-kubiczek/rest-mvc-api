import { NextFunction, Request, Response } from "express"
import { verifyAccessToken } from "../helpers/token"
import UserQuery from "../queries/user"

export const authentificate = async function (req: Request, res: Response, next: NextFunction) {
   const accessToken = req.cookies["accessToken"] as string | undefined

   if (!accessToken) {
      res.status(401).json({ error: "Unauthorized. Token invalid or expired" })
      return
   }

   let validatedToken: ReturnType<typeof verifyAccessToken>
   try {
      validatedToken = verifyAccessToken(accessToken)
   } catch (error) {
      res.status(401).json({ error: "Unauthorized. Token invalid or expired" })
      return
   }

   const userQuery = new UserQuery()

   const existingUser = await userQuery.readById(validatedToken.id)

   if (!existingUser) res.status(401).json({ error: "Unauthorized. Token invalid or expired" })

   req.context.user = existingUser
   req.context.accessToken = accessToken

   next()
}
