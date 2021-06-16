export abstract class HttpErrorException {
  public constructor(
    private type: string,
    private errorCode: string,
    private message: string
  ) {}
}
