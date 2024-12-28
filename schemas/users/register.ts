import { z } from "zod"

export const registerSchema = z.object({
   name: z.string().min(1).max(255),
   email: z.string().email(),
   password: z.string().min(6).max(255)
})

export type RegisterSchema = z.infer<typeof registerSchema>
