import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
    @IsNotEmpty({ message: 'Name khong duoc trong' })
    name: string;

    @IsNotEmpty({ message: 'description khong duoc trong' })
    description: string;

    @IsNotEmpty({ message: 'isActive khong duoc trong' })
    isActive: boolean;

    @IsArray({ message: 'permissions có dinh dang là array' })
    @IsMongoId({ each: true, message: 'each permissions là mongo object id' })
    @IsNotEmpty({ message: 'permissions khong de trong' })
    permissions: mongoose.Schema.Types.ObjectId[];
}
