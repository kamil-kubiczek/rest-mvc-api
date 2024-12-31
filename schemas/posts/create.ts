import { z } from "zod"

export const createPostSchema = z.object({
   title: z.string().min(1).max(255),
   content: z.string().min(1).max(5000),
   published: z.boolean()
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
