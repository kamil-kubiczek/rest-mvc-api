import consola from "consola"
import { NextFunction, Request, Response } from "express"

export const logger = function (req: Request, res: Response, next: NextFunction) {
   consola.info("request - from", req.headers["user-agent"], "- path: ", req.path)
   next()
}
