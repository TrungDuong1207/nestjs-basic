import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
    constructor(@InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>) { }

    async create(createPermissionDto: CreatePermissionDto, user: IUser) {
        const { name, apiPath, method, module } = createPermissionDto
        const isExist = await this.permissionModel.findOne({ method, apiPath });
        if (isExist) {
            throw new BadRequestException(`the method and api path da ton tai tren he thong`);
        }

        let permission = await this.permissionModel.create({
            ...createPermissionDto,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        })
        return permission;
    }

    async findAll(curentPage: number, limit: number, qs: string) {
        const { filter, sort, projection, population } = aqp(qs);
        delete filter.current;
        delete filter.pageSize;

        let offset = (+curentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.permissionModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.permissionModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            // @ts-ignore: Unreachable code error
            .sort(sort)
            .populate(population)
            .select(projection as any)
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new BadRequestException(`not found permission with id=${id}`)
        }
        return this.permissionModel.findOne({ _id: id });
    }

    async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
        return await this.permissionModel.updateOne(
            { _id: id },
            {
                ...updatePermissionDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email
                }
            }
        );
    }

    async remove(id: string, user: IUser) {
        await this.permissionModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
        return this.permissionModel.softDelete({
            _id: id
        })
    }
}
