import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminService],
  controllers: [
    AdminController
  ],
  exports: [AdminService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'admin/users', method: RequestMethod.GET}, {path: 'user', method: RequestMethod.PUT});
  }
}
