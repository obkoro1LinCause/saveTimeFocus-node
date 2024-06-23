import { Module } from '@nestjs/common';
import { BlockDynamicModule, UserDynamicModule} from '@app/module';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [BlockController],
  providers: [BlockService],
  exports:[BlockService],
  imports:[HttpModule,BlockDynamicModule,UserDynamicModule]
})
export class BlockModule {}
