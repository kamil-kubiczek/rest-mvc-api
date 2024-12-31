import { Request, Response } from "express"
import PostQuery from "../../queries/post"

export default async function (req: Request<{ id: string }, {}, {}>, res: Response) {
   try {
      const { id } = req.params

      const query = new PostQuery()

      const post = await query.readById(id)

      if (!post) {
         res.status(404).send()

         return
      }

      if (post.userId !== req.context.user.id) {
         res.status(401).send("Unauthorized")
         return
      }

      res.status(200).json(post)
      return
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
