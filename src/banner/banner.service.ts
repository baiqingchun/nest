import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {getRepository, Repository} from "typeorm";
import {MsgService} from "../msg/msg.service";
import {BannerEntity} from "./banner.entity";
import {PageParam,BannerDto} from "./dto"

@Injectable()
export class BannerService {
    constructor(
        @InjectRepository(BannerEntity)
        private readonly bannerRepository: Repository<BannerEntity>,
        private readonly MSG: MsgService
    ) {}

    async findAll(PageParam:PageParam){
        let size = +PageParam.size||20
        let page = +PageParam.page
        const qb1 = await getRepository(BannerEntity).createQueryBuilder('admin').getCount()
        const qb = await getRepository(BannerEntity).createQueryBuilder('admin').skip(size * (page - 1))
            .take(size);
        let list = await qb.getMany()
        let total = qb1
        return {list,total}
    }
    async add(BannerDto:BannerDto){
       return  await this.bannerRepository.save(BannerDto)
    }
    async edit(BannerDto:BannerDto){
        let bid = +BannerDto.bid
        if(!bid)return this.MSG.fail('no bid')
        let one = await this.bannerRepository.findOne({id:bid})
        if(!one)return this.MSG.fail('no banner')
        delete BannerDto.bid
        let update = Object.assign(one,BannerDto)
        return  await this.bannerRepository.save(update)
    }
    async delete(bid:number){
        if(!bid)return this.MSG.fail('no bid')
       return  await this.bannerRepository.delete({id:bid})
    }
}
