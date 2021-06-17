import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Database } from "./config/Database";
import { UserController } from "./controller/UserController";
import { UserLoginRequest } from "./model/contract/request/UserLoginRequest";
import { UserRegisterRequest } from "./model/contract/request/UserRegisterRequest";
import { BadRequestException } from "./model/exception/BadRequestException";
import { CommonHandlerException } from "./model/exception/CommonHandlerException";

const app = express();
const port = 3000;
const userController: UserController = new UserController();

app.use(express.json());
Database.initialize();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/register", async (req: Request, res: Response) => {
  const requestBody: UserRegisterRequest = req.body;
  let response = null;
  try {
    response = await userController.postUserRegister(requestBody);
  } catch (ex) {
    CommonHandlerException.generateErrorResponse(req, res, ex);
    return;
  }
  res.status(201).json(response);
});

app.post("/login", async (req: Request, res: Response) => {
  const requestBody: UserLoginRequest = req.body;
  let response = null;
  try {
    response = await userController.postUserLogin(requestBody);
  } catch (ex) {
    CommonHandlerException.generateErrorResponse(req, res, ex);
    return;
  }
  res.status(200).json(response);
});

app.listen(port, () => console.log(`listening on port: ${port}`));

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));
