import {
    PipeTransform,
    ArgumentMetadata,
    Injectable,
  } from '@nestjs/common'
  import { validate } from 'class-validator'
  import { plainToClass } from 'class-transformer'
  import * as _ from 'lodash'
  import { ValidationError } from '@app/errors/validation.error'
  
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
      const { metatype } = metadata;
      if (!metatype || !this.toValidate(metatype)) {
        return value
      }
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        const errorMessage = [];
        errors.forEach((error)=>{
            errorMessage.push(_.values(error.constraints));
        })
        throw new ValidationError(errorMessage.join(','))
      }
      return value;
    }
  
    private toValidate(metatype): boolean {
      const types = [String, Boolean, Number, Array, Object]
      return !types.find(type => metatype === type)
    }
  }
  