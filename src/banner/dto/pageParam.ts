import {IsEmpty, IsMobilePhone, IsNotEmpty} from 'class-validator';

export class PageParam {

    @IsNotEmpty()
    readonly size: number;
    @IsNotEmpty()
    readonly page: number;

}