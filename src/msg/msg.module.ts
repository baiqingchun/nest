import {Global, Module} from '@nestjs/common';
import { MsgService } from './msg.service';
@Global()
@Module({
  "providers": [MsgService],
  exports: [MsgService]
})
export class MsgModule {

}
