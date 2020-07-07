import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Body } from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import multer = require('multer');
// import {StorageService} from 'src/common/storage/storage.service'
import {FileService} from './file.service'
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService:FileService,
  ) {
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFile(@UploadedFile() file) {
    // 这里的 file 已经是保存后的文件信息了，在此处做数据库处理，或者直接返回保存后的文件信息
    // const buckets =await this.storageService.getBuckets()
    console.log(file)
    return file;
  }

  @Post('upload3')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() file) {
    console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
    { name: 'avatar_name' },
    { name: 'background_name'}
  ]))
  async uploads(@UploadedFiles() files,@Body() body) {
    console.log(files,body)
  }

  @Post('upload5')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFileAny(@UploadedFiles() files) {
    console.log(files);
  }

  @Post('upload/google')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, '/Users/baiqingchun/Desktop/aaaaaaaaaa');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async uploade(@UploadedFile() file) {
    await this.fileService.upload(file.path)
    return file;
  }
}
