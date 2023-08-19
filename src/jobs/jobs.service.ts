import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { Job, JobDocument } from './schemas/job.schema';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) { }

    async create(createJobDto: CreateJobDto, user: IUser) {
        let job = await this.jobModel.create({
            ...createJobDto,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        })
        return job;
    }

    async findAll(curentPage: number, limit: number, qs: string) {
        const { filter, sort, projection, population } = aqp(qs);
        delete filter.current;
        delete filter.pageSize;

        let offset = (+curentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.jobModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.jobModel.find(filter, '-password')
            .skip(offset)
            .limit(defaultLimit)
            // @ts-ignore: Unreachable code error
            .sort(sort)
            .populate(population)
            .exec();

        return {
            meta: {
                current: curentPage, //trang hiện tại
                pageSize: limit, //số lượng bản ghi đã lấy
                pages: totalPages, //tổng số trang với điều kiện query
                total: totalItems // tổng số phần tử (số bản ghi)
            },
            result //kết quả query
        }
    }

    findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) return 'not found job'
        return this.jobModel.findOne({ _id: id });
    }

    async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
        return await this.jobModel.updateOne(
            { _id: id },
            {
                ...updateJobDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email
                }
            }
        );
    }

    async remove(id: string, user: IUser) {
        await this.jobModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
        return this.jobModel.softDelete({
            _id: id
        })
    }


}
