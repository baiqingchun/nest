import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import { promisify } from 'util';
@Injectable()
export class FileService {
  constructor() {
  }
  async upload(tempLocalPath:string):Promise<any>{
    //传到其他平台比如 oss 等，下面的代码是删除服务器文件
    const unlink = promisify(fs.unlink);
    return unlink(tempLocalPath);
  }
}
