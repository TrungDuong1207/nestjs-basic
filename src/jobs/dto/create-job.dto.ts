import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    logo: string;
}

export class CreateJobDto {
    @IsNotEmpty({ message: 'Name khong duoc trong' })
    name: string;

    @IsArray({ message: 'skills có dinh dang là array' })
    @IsString({ each: true, message: 'skill có dinh dang là string' })
    @IsNotEmpty({ message: 'skills khong de trong' })
    skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsNotEmpty({ message: 'salary khong duoc trong' })
    salary: number;

    @IsNotEmpty({ message: 'quantity khong duoc trong' })
    quantity: number;

    @IsNotEmpty({ message: 'level khong duoc trong' })
    level: string;

    @IsNotEmpty({ message: 'description khong duoc trong' })
    description: string;


    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'start date có dinh dang là date' })
    @IsNotEmpty({ message: 'start Date khong duoc trong' })
    startDate: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'end date có dinh dang là date' })
    @IsNotEmpty({ message: 'end Date khong duoc trong' })
    endDate: Date;

    isActive: boolean;

    @IsNotEmpty({ message: 'location khong duoc trong' })
    location: string;
}
