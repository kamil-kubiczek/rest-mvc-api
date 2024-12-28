import { RefreshToken } from "@prisma/client"

interface IRefreshTokenRepository {
   create(): RefreshToken
   read(id: string): RefreshToken
   delete(id: string): void
}

export default class RefreshTokenRepository implements IRefreshTokenRepository {
   read(id: string): RefreshToken {
      throw new Error("Method not implemented.")
   }
   readById(id: string): RefreshToken {
      throw new Error("Method not implemented.")
   }
   create(): RefreshToken {
      throw new Error("Method not implemented.")
   }
   delete(id: string): void {
      throw new Error("Method not implemented.")
   }
}
