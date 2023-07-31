import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsEmail({}, {message: 'email khong dung dinh dang'})
    @IsNotEmpty({message: 'email khong de trong'})
    email: string;

    @IsNotEmpty({message: 'password khong duoc trong'})
    password: string;
    name: string;
    address: string;
}
