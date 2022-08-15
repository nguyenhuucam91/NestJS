import { getI18nContextFromArgumentsHost, I18nValidationException } from 'nestjs-i18n';
import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(I18nValidationException)
export class ExtendedUnprocessableEntityFilter implements ExceptionFilter {

  status: number = HttpStatus.UNPROCESSABLE_ENTITY

  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    const i18n = getI18nContextFromArgumentsHost(host)
    const formattedErr = exception.errors.map(err => { 
      return {
        [err.property]: this.translateError(err.property, Object.values(err.constraints)[0], i18n)
      }
    })

    return response.status(this.status).json({
      status: this.status,
      message: 'Unprocessable entity',
      errors: formattedErr
    })
  }

  translateError(property, validationPattern, i18n) { 
    const [translationKey, argsString] = validationPattern.split('|');
    const args = !!argsString ? JSON.parse(argsString) : {};
    return i18n.t(translationKey, {
        args: Object.assign({ property}, args),
    });
  }
}