import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Name khong de trong' })
    name: string;

    @IsNotEmpty({ message: 'address khong duoc trong' })
    address: string;

    @IsNotEmpty({ message: 'description khong duoc trong' })
    description: string;

    @IsNotEmpty({ message: 'logo khong duoc trong' })
    logo: string;
}
