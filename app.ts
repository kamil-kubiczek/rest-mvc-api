import express, { NextFunction, Request, Response } from "express"
import expressContext from "express-request-context"

import consola from "consola"

import healthcheckController from "./controllers/healthcheck"
import getUserController from "./controllers/users/get"
import registerUserController from "./controllers/users/register"
import deleteUserController from "./controllers/users/delete"
import refreshTokenController from "./controllers/users/refreshToken"
import loginUserController from "./controllers/users/login"
import getPostController from "./controllers/posts/get"
import getPostsListController from "./controllers/posts/getList"
import createPostController from "./controllers/posts/create"
import deletePostController from "./controllers/posts/delete"
import updatePostController from "./controllers/posts/update"

import { logger } from "./middlewares/logger"
import { authentificate } from "./middlewares/authentificate"
import cookieParser from "cookie-parser"

const app = express()

const port = 3004

app.use(cookieParser())
app.use(expressContext())

app.use(logger)

app.get("/healthcheck", healthcheckController)

app.route("/register").get(registerUserController)
app.route("/login").post(loginUserController)
app.route("/refresh-token").get(refreshTokenController)

app.route("/users/:id").get(getUserController)
app.route("/users/:id").delete(deleteUserController)

app.route("/posts/:id").get(getPostController)
app.route("/posts/:id").post(updatePostController)
app.route("/posts/:id").delete(deletePostController)
app.route("/posts").get(getPostsListController)
app.route("/posts/").post(createPostController)

app.listen(port, () => {
   consola.success(`REST MVC API listening on port ${port}`)
})
