import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty({ message: 'Name khong duoc trong' })
    name: string;

    @IsNotEmpty({ message: 'Api path khong de trong' })
    apiPath: string;

    @IsNotEmpty({ message: 'method khong duoc trong' })
    method: string;

    @IsNotEmpty({ message: 'module khong duoc trong' })
    module: string;

}