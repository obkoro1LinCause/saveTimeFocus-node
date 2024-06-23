
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards,UsePipes } from '@nestjs/common';
import { Responser } from '@app/decorators/responser.decorator';
import { BlockService } from './block.service';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class BlockController {
    constructor(private readonly blockService: BlockService) {};

    // 添加block
    @Post('/add_block')
    @Responser.handle('post  add_block')
    addBlockSite(@Body() data:any){
        return this.blockService.addBlockSite(data);
    }

    // 更新block
    @Post('/update_block')
    @Responser.handle('post  update_block')
    updateBlockSite(){
        
    }

    @Post('/del_block')
    @Responser.handle('post del_block')
    delBlockSite(){}

    // 查询用户对应的block
    @Get('find_block')
    @Responser.handle('post  update_block')
    findBlock(){}

    // 搜索查询block
    @Get('/search_block')
    @Responser.handle('get  search_block')
    searchBlock(@Query() data:any){
        return this.blockService.searchWebSite(data.query);
    }


    @Get('/website_list')
    @Responser.handle('get  website_list')
    findWebsite(){
        return this.blockService.getWebSiteList();
    }

}


