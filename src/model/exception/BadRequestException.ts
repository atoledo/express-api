import { HttpErrorException } from "./HttpErrorException";

export class BadRequestException extends HttpErrorException {
  public constructor(errorCode: string, message: string) {
    super("BAD_REQUEST", errorCode, message);
  }
}
