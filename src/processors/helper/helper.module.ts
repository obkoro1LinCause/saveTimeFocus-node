import { Global, Module } from '@nestjs/common';
import { EmailService } from './helper.service.email';
// import { HttpModule } from '@nestjs/axios'

const services = [EmailService]


@Global()
@Module({
    // imports: [HttpModule],
    providers: services,
    exports:services,
})
export class HelperModule {}

