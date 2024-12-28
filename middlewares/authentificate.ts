import { NextFunction, Request, Response } from "express"

export const authentificate = function (req: Request, res: Response, next: NextFunction) {
   if (true) {
      next()
   } else {
      res.status(401).json({ error: "Unauthorized" })
   }
}
