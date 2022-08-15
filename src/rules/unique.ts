import {
  registerDecorator, ValidationArguments, ValidationOptions,
  ValidatorConstraint, ValidatorConstraintInterface
} from "class-validator";
import { Injectable } from '@nestjs/common';
import { QueryTypes, Sequelize } from "sequelize";
import { InjectConnection } from "@nestjs/sequelize";
import { UniqueOptions } from "./unique-options";

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface
{  
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>
  {
    let constraints = validationArguments.constraints[0]
    let table = constraints.table
    let field = validationArguments.property
    let sql: any

    if (constraints.field) {
      field = constraints.field
    }

    if (constraints.except) {
      const { type, field: exceptField } = validationArguments.constraints[0].except
      const exceptValue = validationArguments.object['context'][type][exceptField]
      sql = `SELECT * FROM ${table} WHERE ${field} = :value AND ${exceptField} != ${exceptValue}`;
    } else {
      sql = `SELECT * FROM ${table} WHERE ${field} = :value`;
    }

    const res = await this.sequelize.query(sql, {
        replacements: {value},
        type: QueryTypes.SELECT
    })
    
    return res.length == 0
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Text $value must be unique'
  } 
  
}

export function Unique(property: UniqueOptions, validationOption?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOption,
      constraints: [property],
      validator: UniqueConstraint,
    });
  }
}