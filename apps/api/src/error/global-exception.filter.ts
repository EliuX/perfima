import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name, {
    timestamp: true,
  });

  catch(exception: unknown, host: ArgumentsHost): void {
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Unexpected error. Our team is working to solve this issue.';

    this.logger.error((exception as Error).stack);

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
