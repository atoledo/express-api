import { Users } from "../entity/Users";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Security } from "../config/Security";

export class JWT {
  public static async generateToken(user: Users) {
    const payload = {
      email: user.email,
    };

    return await jwt.sign(payload, Security.getJwtSecret(), {
      expiresIn: "1h",
      jwtid: uuidv4(),
      subject: user.id.toString(),
    });
  }
}
