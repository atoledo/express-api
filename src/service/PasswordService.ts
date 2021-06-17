import * as bcrypt from "bcrypt";

export class PasswordService {
  public static async hashPassword(password: string) {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  }

  public static async comparePassword(
    reqPassword: string,
    currentPassword: string
  ) {
    return await bcrypt.compare(reqPassword, currentPassword);
  }
}
