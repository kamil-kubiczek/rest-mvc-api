import { User } from "@prisma/client"
import { prisma } from "../prisma/client"

interface IUserQuery {
   readById(id: string): Promise<User | null>
   create(data: Omit<User, "updatedAt">): Promise<User>
   delete(id: string): Promise<void>
}

export default class UserQuery implements IUserQuery {
   readById(id: string) {
      return prisma.user.findUnique({ where: { id } })
   }
   create(data: Omit<User, "updatedAt">) {
      return prisma.user.create({ data })
   }
   async delete(id: string) {
      await prisma.user.delete({ where: { id } })
   }
}
