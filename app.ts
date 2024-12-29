import express, { NextFunction, Request, Response } from "express"
import expressContext from "express-request-context"
import cookieParser from "cookie-parser"

import consola from "consola"

import healthcheckController from "./controllers/healthcheck"
import getUserController from "./controllers/users/get"
import registerUserController from "./controllers/users/register"
import deleteUserController from "./controllers/users/delete"
import refreshTokenController from "./controllers/users/refreshToken"
import loginUserController from "./controllers/users/login"
import logoutUserController from "./controllers/users/logout"

import getPostController from "./controllers/posts/get"
import getPostsListController from "./controllers/posts/getList"
import createPostController from "./controllers/posts/create"
import deletePostController from "./controllers/posts/delete"
import updatePostController from "./controllers/posts/update"

import { logger } from "./middlewares/logger"
import { authentificate } from "./middlewares/authentificate"
import { registerSchema } from "./schemas/users/register"
import { validateBody } from "./middlewares/validation"
import { loginSchema } from "./schemas/users/login"
import bodyParser from "body-parser"

const app = express()

const port = process.env.API_PORT || 3000

app.use(bodyParser.json())
app.use(expressContext())
app.use(cookieParser())

app.use(logger)

app.get("/healthcheck", healthcheckController)

app.route("/register").post(validateBody(registerSchema), registerUserController)
app.route("/login").post(validateBody(loginSchema), loginUserController)
app.route("/logout").post(authentificate, logoutUserController)
app.route("/refresh-token").post(refreshTokenController)

app.route("/users/:id").get(authentificate, getUserController)
app.route("/users/:id").delete(authentificate, deleteUserController)

app.route("/posts/:id").get(authentificate, getPostController)
app.route("/posts/:id").post(authentificate, updatePostController)
app.route("/posts/:id").delete(authentificate, deletePostController)
app.route("/posts").get(authentificate, getPostsListController)
app.route("/posts/").post(authentificate, createPostController)

app.listen(port, () => {
   consola.success(`REST MVC-like API listening on port ${port}`)
})
