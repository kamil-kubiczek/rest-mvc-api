import { Request, Response } from "express"
import UserQuery, { CreateUserQueryInput } from "../../queries/user"
import bcrypt from "bcrypt"

export default async function (req: Request<{}, {}, CreateUserQueryInput>, res: Response) {
   const { name, email, password } = req.body
   const query = new UserQuery()
   const hashedPassword = bcrypt.hashSync(password, 10)
   const user = await query.create({ name, email, password: hashedPassword })

   res.status(200).json(user)
}
