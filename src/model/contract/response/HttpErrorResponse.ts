import { HttpError } from "../../exception/HttpError";

export type HttpErrorResponse = {
  response: null;
  error: HttpError;
};
