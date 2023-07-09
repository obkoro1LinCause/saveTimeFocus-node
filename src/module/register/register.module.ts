import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { RegisterProvider } from './register.model'
@Module({
  controllers: [RegisterController],
  providers: [RegisterProvider,RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
