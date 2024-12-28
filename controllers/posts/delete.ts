import { Request, Response } from "express"
import PostQuery from "../../queries/post"

export default async function (req: Request<{ id: string }, {}, {}>, res: Response) {
   try {
      const { id } = req.params

      const query = new PostQuery()

      await query.delete(id)

      res.status(200)
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
