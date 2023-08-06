import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
    @Prop({requied: true})
    email: string;

    @Prop({requied: true})
    password: string;

    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop()
    age: string;

    @Prop()
    address: string;

    @Prop()
    createAt: string;

    @Prop()
    updatedAt: string;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);