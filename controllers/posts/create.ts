import { Request, Response } from "express"
import PostQuery, { CreatePostQueryInput } from "../../queries/post"

export default async function (req: Request<{}, {}, Omit<CreatePostQueryInput, "userId">>, res: Response) {
   try {
      const { title, content, published } = req.body

      const userId = req.context.user.id

      const query = new PostQuery()

      const createdPost = await query.create({
         content,
         published,
         title,
         userId
      })

      res.status(201).json(createdPost)
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
   }
}
