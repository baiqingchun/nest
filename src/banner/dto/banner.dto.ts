import {IsEmpty, IsMobilePhone, IsNotEmpty} from 'class-validator';

export class BannerDto {
    bid?: number;
    @IsNotEmpty()
    readonly path: string;

}
