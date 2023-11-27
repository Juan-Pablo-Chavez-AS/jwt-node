
export default class ErrorResponse {
  private constructor(){};

  public static simpleErrorResponse(err: Error) {
    return { message: err.message, stack: err.stack }
  }
}
