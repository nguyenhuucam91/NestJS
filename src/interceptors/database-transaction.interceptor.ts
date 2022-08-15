import { Sequelize, Transaction } from 'sequelize';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class DatabaseTransactionInterceptor implements NestInterceptor {

  constructor(@InjectConnection() private readonly sequelizeInstance: Sequelize) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>
  {
    const req = context.switchToHttp().getRequest()

    const transaction : Transaction = await this.sequelizeInstance.transaction();

    req.transaction = transaction
      
    return next.handle().pipe(tap(() => {
              transaction.commit();
    }), catchError(err => {
      transaction.rollback();
      return throwError(err)
        }))
  }
  
}