import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @ResponseMessage("Create a new permission success")
  create(@Body() createPermissionDto: CreatePermissionDto, @User() user: IUser) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @ResponseMessage("Fetch permission with paginate")
  findAll(
    @Query("current") curentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.permissionsService.findAll(+curentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a permission by ID")
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update a permission success")
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: IUser
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a permission success")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  }
}
