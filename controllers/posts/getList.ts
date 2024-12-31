import { Request, Response } from "express"
import PostQuery from "../../queries/post"

export default async function (req: Request<{}, {}, {}>, res: Response) {
   try {
      const query = new PostQuery()

      const posts = await query.readList({
         userId: req.context.user.id
      })

      res.status(200).json(posts)
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
