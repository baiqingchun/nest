import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FileModule} from './file/file.module'
import {AdminModule} from './admin/admin.module'
import {MsgModule} from './msg/msg.module'
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "123456qwer",
      "database": "test18",
      "entities": [ __dirname + '/**/*.entity.{js,ts}'],
      "synchronize": true
    }),
    FileModule,
    AdminModule,
    UserModule,
    BannerModule,
    MsgModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
