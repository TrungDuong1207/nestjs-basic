import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
    @Prop()
    name: string;

    @Prop({requied: true})
    email: string;

    @Prop({requied: true})
    password: string;

    @Prop()
    age: string;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop({type: Object})
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };

    @Prop()
    role: string;

    @Prop()
    refreshToken: string;

    @Prop({type: Object})
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({type: Object})
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({type: Object})
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

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