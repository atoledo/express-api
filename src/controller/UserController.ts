import { UserRegisterRequest } from "../model/contract/request/UserRegisterRequest";
import { BadRequestException } from "../model/exception/BadRequestException";

export class UserController {
  public postUserRegister(request: UserRegisterRequest) {
    this.validateUserRegister(request);
  }

  private validateUserRegister(request: UserRegisterRequest) {
    if (request.password !== request.confirmPassword) {
      throw new BadRequestException(
        "INVALID_REQUEST",
        "Confirm password does not match provided password"
      );
    }
  }
}
