import express, { NextFunction, Request, Response } from "express"
import healthcheckController from "./controllers/healthcheck"
import getUserController from "./controllers/user/get"
import registerUserController from "./controllers/user/register"
import deleteUserController from "./controllers/user/delete"
import refreshTokenController from "./controllers/user/refreshToken"
import loginUserController from "./controllers/user/login"
import consola from "consola"

const app = express()
const port = 3004

const logger = function (req: Request, res: Response, next: NextFunction) {
   consola.info("request - from", req.headers["user-agent"])
   next()
}

app.use(logger)

app.get("/healthcheck", healthcheckController)

app.route("/register").get(registerUserController)
app.route("/login").post(loginUserController)
app.route("/refresh-token").get(refreshTokenController)

app.route("/user/:id").get(getUserController)
app.route("/user/:id").delete(deleteUserController)

app.listen(port, () => {
   consola.success(`REST MVC API listening on port ${port}`)
})
