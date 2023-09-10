import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Name khong duoc trong' })
    name: string;

    @IsEmail({}, { message: 'email khong dung dinh dang' })
    @IsNotEmpty({ message: 'email khong de trong' })
    email: string;

    @IsArray({ message: 'skills có dinh dang là array' })
    @IsString({ each: true, message: 'skill có dinh dang là string' })
    @IsNotEmpty({ message: 'skills khong de trong' })
    skills: string[];
}
