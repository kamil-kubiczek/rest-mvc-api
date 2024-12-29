import { RefreshToken, User } from "@prisma/client"
import { prisma } from "../prisma/client"

interface IRefreshTokenQuery {
   create(data: Omit<RefreshToken, "updatedAt">): Promise<RefreshToken>
   readById(token: string): Promise<RefreshToken | null>
   readByUserId(id: string): Promise<RefreshToken | null>
   delete(token: string): Promise<void>
   deleteByUserId(userId: RefreshToken["userId"]): Promise<void>
}

export default class RefreshTokenQuery implements IRefreshTokenQuery {
   readById(token: string) {
      return prisma.refreshToken.findUnique({ where: { token } })
   }
   readByUserId(id: string) {
      return prisma.refreshToken.findFirst({ where: { userId: id } })
   }
   create(data: Omit<RefreshToken, "updatedAt">) {
      return prisma.refreshToken.create({ data: data })
   }
   async delete(token: string) {
      await prisma.refreshToken.delete({ where: { token } })
   }
   async deleteByUserId(userId: RefreshToken["userId"]) {
      await prisma.refreshToken.delete({ where: { userId } })
   }
}
