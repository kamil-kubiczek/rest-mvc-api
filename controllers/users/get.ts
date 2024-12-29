import { Request, Response } from "express"
import UserQuery from "../../queries/user"

export default async function (req: Request<{ id: string }, {}, {}>, res: Response) {
   const user = req.context.user

   const id = req.params.id

   const userQuery = new UserQuery()

   if (user.id !== id) {
      return res.status(401).send("Unauthorized")
   }

   const userResult = await userQuery.readById(id)

   if (!userResult) {
      return res.status(404).send()
   }

   return res.status(200).send(userResult)
}
