import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GlobalExceptionFilter } from './global-exception.filter';
import { BSONError } from 'typeorm/driver/mongodb/bson.typings';

@Catch(BSONError)
export class DuplicateExceptionFilter implements ExceptionFilter<BSONError> {
  catch(error: BSONError, host: ArgumentsHost) {
    GlobalExceptionFilter.respondWithStandardFormat(
      host,
      400,
      error.message,
    );
  }
}
