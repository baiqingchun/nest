import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BannerEntity} from "./banner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
