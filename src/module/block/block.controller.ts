
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards,UsePipes } from '@nestjs/common';
import { Responser } from '@app/decorators/responser.decorator';
import { BlockService } from './block.service';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { QueryParams, QueryVisitor } from '@app/decorators/queryparams.decorator';
import { ReqParams,ReqParamsResult } from '@app/decorators/reqparams.decorator'

@Controller()
export class BlockController {
    constructor(private readonly blockService: BlockService) {};

    // 添加block
    @UseGuards(JwtAuthGuard)
    @Post('/add_block')
    @Responser.handle('post  add_block')
    addBlockSite(@Body()data:any, @ReqParams('user') user:any){
        this.blockService.addBlockSite(user);
    }

    // 更新block
    @UseGuards(JwtAuthGuard)
    @Post('/update_block')
    @Responser.handle('post  update_block')
    updateBlockSite(@ReqParams('user') user:any){
        console.log(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/del_block')
    @Responser.handle('post del_block')
    delBlockSite(@ReqParams('user') user:any){
        console.log(user);
    }

    // 查询用户对应的block
    @UseGuards(JwtAuthGuard)
    @Get('find_block')
    @Responser.handle('post  update_block')
    findBlock(@ReqParams('user') user:any){
        return this.blockService.findBlockSite(user);
    }

    // 搜索查询block
    // @UseGuards(JwtAuthGuard)
    @Get('/search_block')
    @Responser.handle('get  search_block')
    searchBlock(@Query() data:any){
        return this.blockService.searchWebSite(data.query);
    }


    @UseGuards(JwtAuthGuard)
    @Get('/website_list')
    @Responser.handle('get  website_list')
    findWebsite(){
        return this.blockService.getWebSiteList();
    }

}


