import { Request, Response } from "express";
import { BadRequestException } from "./BadRequestException";
import { HttpErrorException } from "./HttpErrorException";
import { UnauthorizedException } from "./UnauthorizedException";

export class CommonHandlerException {
  public static generateErrorResponse(
    req: Request,
    res: Response,
    ex: HttpErrorException
  ) {
    if (ex instanceof BadRequestException) {
      console.log(
        `BadRequestException during ${req.method} - ${
          req.url
        }: ${ex.getMessage()}`
      );
      res.status(400).json({
        response: null,
        error: ex,
      });
    } else if (ex instanceof UnauthorizedException) {
      console.log(
        `UnauthorizedException during ${req.method} - ${
          req.url
        }: ${ex.getMessage()}`
      );
      res.status(401).json({
        response: null,
        error: ex,
      });
    } else {
      console.log(
        `InternalServerErrorException during ${req.method} - ${
          req.url
        }: ${ex.getMessage()}`
      );
      res.status(500).json({
        response: null,
        error: ex,
      });
    }
  }
}
