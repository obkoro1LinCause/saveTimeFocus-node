import { PipeTransform, ArgumentMetadata, Injectable} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import * as _ from 'lodash'
import { ValidationError } from '@app/errors/validation.error'


export const isUnverifiableMetaType = (metatype: any): metatype is undefined => {
  const basicTypes = [String, Boolean, Number, Array, Object]
  return !metatype || basicTypes.includes(metatype)
}
  /**
   * request params pipe
   */
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {

      const { metatype } = metadata;
      if (isUnverifiableMetaType(metatype)) {
        return value;
      };
      const object = plainToClass(metatype, value);
      const errors = await validate(object);

      if (errors.length > 0) {
        const errorMessage = [];
        errors.forEach((error)=>{
            errorMessage.push(_.values(error.constraints));
        });
        throw new ValidationError(errorMessage.join(','))
      }
      return value;
    }
  }
  