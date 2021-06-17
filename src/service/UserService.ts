import { Database } from "../config/Database";
import { Users } from "../entity/Users";
import { UserLoginRequest } from "../model/contract/request/UserLoginRequest";
import { UserRegisterRequest } from "../model/contract/request/UserRegisterRequest";
import { UserLoginResponse } from "../model/contract/response/UserLoginResponse";
import { UserRegisterResponse } from "../model/contract/response/UserRegisterResponse";
import { BadRequestException } from "../model/exception/BadRequestException";
import { UnauthorizedException } from "../model/exception/UnauthorizedException";
import { JWT } from "./JWT";
import { PasswordService } from "./PasswordService";

export class UserService {
  public async registerUser(
    request: UserRegisterRequest
  ): Promise<UserRegisterResponse> {
    let result = await Database.userRepository.findOne({
      email: request.email,
    });

    if (result) {
      throw new BadRequestException(
        "DUPLICATED_USER",
        "User with provided email already exists"
      );
    }

    let user = new Users();
    user.username = request.username;
    user.email = request.email;
    user.password = await PasswordService.hashPassword(request.password);
    user.age = request.age;

    let newUser = await Database.userRepository.save(user);

    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
  }

  public async loginUser(
    request: UserLoginRequest
  ): Promise<UserLoginResponse> {
    let user = await Database.userRepository.findOne({
      email: request.email,
    });

    if (
      !user ||
      !(await PasswordService.comparePassword(request.password, user.password))
    ) {
      throw new UnauthorizedException(
        "UNAUTHORIZED",
        "Invalid email or password"
      );
    }

    const token = await JWT.generateToken(user);
    return {
      id: user.id,
      token: token,
    };
  }
}
