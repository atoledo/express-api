import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as express from "express";
import { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`listening on port: ${port}`));

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));
