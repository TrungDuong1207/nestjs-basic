import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
    @IsNotEmpty({ message: 'Email khong duoc trong' })
    email: string;

    @IsNotEmpty({ message: 'user Id khong de trong' })
    userId: string;

    @IsNotEmpty({ message: 'url khong duoc trong' })
    url: string;

    @IsNotEmpty({ message: 'status khong duoc trong' })
    status: string;

    @IsNotEmpty({ message: 'company Id khong de trong' })
    companyId: string;

    @IsNotEmpty({ message: 'job Id khong de trong' })
    jobId: string;

}

export class CreateUserCVDto {

    @IsNotEmpty({ message: 'url khong duoc trong' })
    url: string;

    @IsNotEmpty({ message: 'company Id khong de trong' })
    @IsMongoId({ message: 'company Id là mongo id' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'job Id khong de trong' })
    @IsMongoId({ message: 'job Id là mongo id' })
    jobId: mongoose.Schema.Types.ObjectId;

}
