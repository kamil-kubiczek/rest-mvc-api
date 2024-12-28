import { Post, Prisma } from "@prisma/client"
import { prisma } from "../prisma/client"

interface IPostQuery {
   readList(where: Prisma.PostWhereInput): Promise<Post[]>
   readById(id: string): Promise<Post | null>
   create(data: Omit<Post, "updatedAt">): Promise<Post>
   update(id: string, data: Post): Promise<Post>
   delete(id: string): Promise<void>
}

export default class PostQuery implements IPostQuery {
   readList(where: Prisma.PostWhereInput) {
      return prisma.post.findMany({ where })
   }
   readById(id: string) {
      return prisma.post.findUnique({ where: { id } })
   }
   create(data: Omit<Post, "updatedAt">) {
      return prisma.post.create({ data })
   }
   update(id: string, data: Omit<Post, "updatedAt">) {
      return prisma.post.update({ where: { id }, data })
   }
   async delete(id: string): Promise<void> {
      await prisma.post.delete({ where: { id } })
   }
}
