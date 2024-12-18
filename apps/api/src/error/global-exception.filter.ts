import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Unexpected error. Our team is working to solve this issue.';

    GlobalExceptionFilter.respondWithStandardFormat(host, statusCode, message);
  }

  public static respondWithStandardFormat(
    host: ArgumentsHost,
    statusCode: number,
    message: string | object,
  ): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    ctx.getResponse().status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
