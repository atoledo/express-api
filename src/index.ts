import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Database } from "./config/Database";
import { UserController } from "./controller/UserController";
import { UserRegisterRequest } from "./model/contract/request/UserRegisterRequest";
import { BadRequestException } from "./model/exception/BadRequestException";

const app = express();
const port = 3000;
const userController: UserController = new UserController();

app.use(express.json());
Database.initialize();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/register", (req: Request, res: Response) => {
  const requestBody: UserRegisterRequest = req.body;

  try {
    userController.postUserRegister(requestBody);
  } catch (ex) {
    if (ex instanceof BadRequestException) {
      res.status(400).json({
        response: null,
        error: ex,
      });
    }
    return;
  }
  res.json("Still mocked!");
});

app.listen(port, () => console.log(`listening on port: ${port}`));

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));
