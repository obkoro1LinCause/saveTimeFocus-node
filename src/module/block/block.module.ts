import { Module } from '@nestjs/common';
import { BlockProvider, UserProvider} from '@app/module';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { HttpModule } from '@nestjs/axios'

@Module({
  controllers: [BlockController],
  providers: [BlockService,BlockProvider,UserProvider],
  exports:[BlockService],
  imports:[HttpModule]
})
export class BlockModule {}
