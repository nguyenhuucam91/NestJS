import { IsNotEmpty } from "class-validator"
import { i18nValidationMessage } from "nestjs-i18n"
import { BaseDTO } from "src/base.dto"
import {  Unique } from "src/rules/unique"

export class CategoryCreateDTO extends BaseDTO {

  @Unique({
    table: 'categories',
  }, {
    message: i18nValidationMessage('validation.unique')
  })
  name: string

  @IsNotEmpty({
    message: i18nValidationMessage('validation.required')
  })
  description: string
}

export class CategoryUpdateDTO extends BaseDTO{ 

  @Unique({
    table: 'categories',
    except: {
      type: 'params',
      field: 'id'
    }
  })
  name: string

  @IsNotEmpty()
  description: string
}