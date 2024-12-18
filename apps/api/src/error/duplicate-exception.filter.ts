import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoBulkWriteError } from 'mongodb';
import { GlobalExceptionFilter } from './global-exception.filter';

@Catch(MongoBulkWriteError)
export class DuplicateExceptionFilter
  implements ExceptionFilter<MongoBulkWriteError>
{
  catch(exception: MongoBulkWriteError, host: ArgumentsHost) {
    const conflictingValues = this.extractDuplicateKeyErrors(exception);
    GlobalExceptionFilter.respondWithStandardFormat(
      host,
      400,
      conflictingValues,
    );
  }

  private extractDuplicateKeyErrors(exception: MongoBulkWriteError): {
    [key: string]: string;
  } {
    const result = {};

    const writeErrors =
      exception.writeErrors instanceof Array
        ? exception.writeErrors
        : [exception.writeErrors];

    writeErrors.forEach((writeError) => {
      const keyValuePairs = writeError.err.errmsg.match(/dup key: { (.+) }/);

      if (keyValuePairs && keyValuePairs[1]) {
        const pairs = keyValuePairs[1].split(',');
        pairs.forEach((pair) => {
          const [key, value] = pair
            .split(':')
            .map((part) => part.trim().replace(/["{]/g, ''));

          result[key] = value;
        });
      }
    });

    return result;
  }
}
