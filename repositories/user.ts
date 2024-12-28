import { User } from "@prisma/client"

interface IUserRepository {
   readById(id: string): User
   create(): User
   delete(id: string): void
}

export default class UserRepository implements IUserRepository {
   readById(id: string): User {
      throw new Error("Method not implemented.")
   }
   create(): User {
      throw new Error("Method not implemented.")
   }
   delete(id: string): void {
      throw new Error("Method not implemented.")
   }
}
