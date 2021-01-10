enum StatusCode {
  success = 200,
  ok = 200,
  created = 201,
  notFound = 404,
  badRequest = 400,
}

export type Response = {
  statusCode: number;
  body: string;
};

class Result {
  private statusCode: number;
  private message: string;
  private data?: any;
  private headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: JSON.stringify({
        message: this.message,
        data: this.data,
      }),
    };
  }
}
export class ResponseUtil {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static success(data: any): Response {
    const result = new Result(StatusCode.success, 'success', data);
    return result.bodyToString();
  }

  // static error(error: Error: Response {
  //   const result = new Result(error)
  //   return result.bodyToString();
  // }
}
