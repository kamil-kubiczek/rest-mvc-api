import { z } from "zod"

export const updatePostSchema = z
   .object({
      title: z.string().min(1).max(255),
      content: z.string().min(1).max(5000),
      published: z.boolean()
   })
   .partial()

export type UpdatePostSchema = z.infer<typeof updatePostSchema>
