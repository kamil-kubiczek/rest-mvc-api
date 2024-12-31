import { Post, Prisma } from "@prisma/client"
import { prisma } from "../prisma/client"

export type CreatePostQueryInput = Omit<Post, "updatedAt" | "id">
export type UpdatePostQueryInput = Partial<Omit<Post, "updatedAt" | "id">>

interface IPostQuery {
   readList(where: Prisma.PostWhereInput): Promise<Post[]>
   readById(id: Post["id"]): Promise<Post | null>
   create(data: CreatePostQueryInput): Promise<Post>
   update(id: Post["id"], data: UpdatePostQueryInput): Promise<Post>
   delete(id: Post["id"]): Promise<void>
}

export default class PostQuery implements IPostQuery {
   readList(where?: Prisma.PostWhereInput) {
      return prisma.post.findMany({ where })
   }
   readById(id: Post["id"]) {
      return prisma.post.findUnique({ where: { id } })
   }
   create(data: CreatePostQueryInput) {
      return prisma.post.create({ data })
   }
   update(id: Post["id"], data: UpdatePostQueryInput) {
      return prisma.post.update({ where: { id }, data })
   }
   async delete(id: Post["id"]): Promise<void> {
      await prisma.post.delete({ where: { id } })
   }
}
