import { Connection, createConnection, Repository } from "typeorm";
import { Users } from "../entity/Users";

export class Database {
  public static connection: Connection;
  public static userRepository: Repository<Users>;

  public static async initialize() {
    this.connection = await createConnection();
    this.userRepository = this.connection.getRepository(Users);
  }
}
