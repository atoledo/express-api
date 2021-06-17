import { UserRegisterRequest } from "../model/contract/request/UserRegisterRequest";
import { BadRequestException } from "../model/exception/BadRequestException";
import { UserService } from "../service/UserService";
import { Constants } from "../constants/Constants";
import { UserLoginRequest } from "../model/contract/request/UserLoginRequest";
import { UserRegisterResponse } from "../model/contract/response/UserRegisterResponse";
import { UserLoginResponse } from "../model/contract/response/UserLoginResponse";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async postUserRegister(
    request: UserRegisterRequest
  ): Promise<UserRegisterResponse> {
    this.validateUserRegister(request);
    return await this.userService.registerUser(request);
  }

  public async postUserLogin(
    request: UserLoginRequest
  ): Promise<UserLoginResponse> {
    let result = await this.userService.loginUser(request);
    return result;
  }

  private validateUserRegister(request: UserRegisterRequest) {
    if (request.password !== request.confirmPassword) {
      throw new BadRequestException(
        "INVALID_REQUEST",
        "Confirm password does not match provided password"
      );
    }
    if (request.age < Constants.MIN_AGE) {
      throw new BadRequestException(
        "USER_UNDERAGE",
        "User does not have the minimum age to access the application"
      );
    }
  }
}
