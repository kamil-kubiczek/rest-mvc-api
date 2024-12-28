import { Request, Response } from "express"
import PostQuery from "../../queries/post"

export default async function (req: Request<{}, {}, {}>, res: Response) {
   try {
      const query = new PostQuery()

      const post = await query.readList()

      res.status(200).json(post)
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
