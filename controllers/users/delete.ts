import { Request, Response } from "express"
import UserQuery from "../../queries/user"

export default async function (req: Request, res: Response) {
   const user = req.context.user

   const id = req.params.id

   const userQuery = new UserQuery()

   if (user.id !== id) {
      res.status(401).send("Unauthorized")
      return
   }

   res.cookie("accessToken", null, { httpOnly: true, sameSite: "none", secure: true })
   res.cookie("refreshToken", null, { httpOnly: true, sameSite: "none", secure: true })

   await userQuery.delete(id)

   res.status(200).send()
   return
}
