import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name khong duoc trong' })
    name: string;

    @IsEmail({}, { message: 'email khong dung dinh dang' })
    @IsNotEmpty({ message: 'email khong de trong' })
    email: string;

    @IsNotEmpty({ message: 'password khong duoc trong' })
    password: string;

    @IsNotEmpty({ message: 'Age khong duoc trong' })
    age: number;

    @IsNotEmpty({ message: 'Gender khong duoc trong' })
    gender: string;

    @IsNotEmpty({ message: 'Address khong duoc trong' })
    address: string;

    @IsNotEmpty({ message: 'Role khong duoc trong' })
    @IsMongoId({ message: 'Role co dinh dang la mongo id' })
    role: mongoose.Schema.Types.ObjectId;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

}

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Name khong duoc trong' })
    name: string;

    @IsEmail({}, { message: 'email khong dung dinh dang' })
    @IsNotEmpty({ message: 'email khong de trong' })
    email: string;

    @IsNotEmpty({ message: 'password khong duoc trong' })
    password: string;

    @IsNotEmpty({ message: 'Age khong duoc trong' })
    age: number;

    @IsNotEmpty({ message: 'Gender khong duoc trong' })
    gender: string;

    @IsNotEmpty({ message: 'Address khong duoc trong' })
    address: string;


}