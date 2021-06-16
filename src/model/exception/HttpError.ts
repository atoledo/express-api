import { HttpStatus } from "../../enum/HttpStatus";

export type HttpError = {
  type: HttpStatus;
  errorCode: string;
  message: string;
};
