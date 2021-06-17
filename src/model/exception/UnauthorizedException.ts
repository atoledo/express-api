import { HttpErrorException } from "./HttpErrorException";

export class UnauthorizedException extends HttpErrorException {
  public constructor(errorCode: string, message: string) {
    super("UNAUTHORIZED", errorCode, message);
  }
}
