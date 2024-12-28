import { Post } from "@prisma/client"

interface IBlogRepository {
   readList(): Post[]
   readById(id: string): Post
   create(): Post
   update(id: string, payload: Post): Post
   delete(id: string): void
}

export default class BlogRepository implements IBlogRepository {
   readList(): Post[] {
      throw new Error("Method not implemented.")
   }
   readById(id: string): Post {
      throw new Error("Method not implemented.")
   }
   create(): Post {
      throw new Error("Method not implemented.")
   }
   update(id: string, payload: Post): Post {
      throw new Error("Method not implemented.")
   }
   delete(id: string): void {
      throw new Error("Method not implemented.")
   }
}
