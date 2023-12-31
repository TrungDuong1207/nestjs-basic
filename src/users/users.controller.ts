import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage("Create a new user success")
  create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @ResponseMessage("Fetch with company with paginate")
  findAll(
    @Query("current") curentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+curentPage, +limit, qs);
  }

  @Get(":id")
  @Public()
  @ResponseMessage("Fetch user by ID")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ResponseMessage("Update a user success")
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a user success")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }

  @Public()
  @Post('/register')
  @ResponseMessage("Register a new user success")
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto)
  }
}
