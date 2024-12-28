import { Request, Response } from "express"
import PostQuery, { UpdatePostQueryInput } from "../../queries/post"

export default async function (req: Request<{ id: string }, {}, UpdatePostQueryInput>, res: Response) {
   try {
      const { id } = req.params
      const { title, content, published, userId } = req.body

      const query = new PostQuery()

      const createdPost = await query.update(id, {
         content,
         published,
         title,
         userId
      })

      res.status(200).json(createdPost)
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
