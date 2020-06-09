import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class MsgService {
 public fail(reason:string, code?:number){
     if (code) {
         throw new HttpException({message: reason},code);
     } else {
         throw new HttpException({message: reason},HttpStatus.BAD_REQUEST);
     }
 }
 public pass(msg:string, dat:any){
     if (!msg) msg = "OK";
     if (!dat) dat = {};

     return { data: dat, message: msg};
 }
}
