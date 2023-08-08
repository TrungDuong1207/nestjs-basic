import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps: true})
export class Company {
    @Prop()
    name: string;

    @Prop({requied: true})
    address: string;

    @Prop()
    description: string;

    @Prop({tyoe: Object})
    createdBy: {
        _id: string;
        email: string;
    };

    @Prop({tyoe: Object})
    updatedBy: {
        _id: string;
        email: string;
    };

    @Prop({tyoe: Object})
    deletedBy: {
        _id: string;
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

export const CompanySchema = SchemaFactory.createForClass(Company);