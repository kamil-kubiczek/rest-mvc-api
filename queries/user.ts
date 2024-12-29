import { User } from "@prisma/client"
import { prisma } from "../prisma/client"

export type CreateUserQueryInput = Omit<User, "updatedAt" | "id">

interface IUserQuery {
   readById(id: string): Promise<Omit<User, "password"> | null>
   readByEmailWithPasswordHash(data: { email: User["email"]; password: User["password"] }): Promise<User | null>
   create(data: CreateUserQueryInput): Promise<Omit<User, "password">>
   delete(id: string): Promise<void>
}

export default class UserQuery implements IUserQuery {
   readById(id: string) {
      return prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, updatedAt: true } })
   }
   readByEmailWithPasswordHash(data: { email: User["email"] }): Promise<User | null> {
      return prisma.user.findFirst({ where: data })
   }
   create(data: CreateUserQueryInput) {
      return prisma.user.create({ data, select: { id: true, name: true, email: true, updatedAt: true } })
   }
   async delete(id: string) {
      await prisma.user.delete({ where: { id } })
   }
}
