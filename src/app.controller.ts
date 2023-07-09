import { Controller, Get ,SetMetadata} from '@nestjs/common';
import * as APP_CONFIG from './app.config'
import { Responser } from '@app/decorators/responser.decorator'

@Controller()
export class AppController {
  @Get()
  @Responser.handle('App_Info api')
  root(): any {
    return APP_CONFIG.PROJECT
  }
}
