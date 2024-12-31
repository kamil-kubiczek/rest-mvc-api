import { Request, Response } from "express"
import UserQuery from "../../queries/user"

export default async function (req: Request<{ id: string }, {}, {}>, res: Response) {
   const user = req.context.user

   const id = req.params.id

   const userQuery = new UserQuery()

   if (user.id !== id) {
      res.status(401).send("Unauthorized")
      return
   }

   const userResult = await userQuery.readById(id)

   if (!userResult) {
      res.status(404).send()
      return
   }

   res.status(200).send(userResult)
   return
}
