import { Request, Response } from "express"
import PostQuery, { UpdatePostQueryInput } from "../../queries/post"

export default async function (req: Request<{ id: string }, {}, UpdatePostQueryInput>, res: Response) {
   try {
      const { id } = req.params

      const userId = req.context.user.id

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

      const updatedPost = await query.update(id, {
         content: req.body.content,
         published: req.body.published,
         title: req.body.title,
         userId
      })

      res.status(200).json(updatedPost)
      return
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
