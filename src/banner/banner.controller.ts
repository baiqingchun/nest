import {Body, Controller, Get, Post, Query, UsePipes} from '@nestjs/common';
import {BannerService} from "./banner.service";
import {PageParam,BannerDto} from "./dto"
import {ValidationPipe} from "../shared/pipes/validation.pipe";

@Controller('banner')
export class BannerController {
    constructor(private readonly bannerService:BannerService) {
    }
    //获取banner列表
    @UsePipes(new ValidationPipe())
    @Get('list')
    async list(@Query()PageParam:PageParam){
      return   await this.bannerService.findAll(PageParam)
    }
    //添加
    @UsePipes(new ValidationPipe())
    @Post('add')
    async add(@Body() BannerDto:BannerDto){
      return await this.bannerService.add(BannerDto)
    }
    @UsePipes(new ValidationPipe())
    @Post('edit')
    async edit(@Body() BannerDto:BannerDto){
        return await this.bannerService.edit(BannerDto)
    }
    @Post('delete')
    async delete(@Body('bid') bid:number){
        return await this.bannerService.delete(bid)
    }
}
