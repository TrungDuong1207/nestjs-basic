import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateUserCVDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumesService } from './resumes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post()
  @ResponseMessage("Create a new resume success")
  create(@Body() createResumeDto: CreateUserCVDto, @User() user: IUser) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  @ResponseMessage("Fetch with resume with paginate")
  findAll(
    @Query("current") curentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
    @User() user: IUser,
  ) {
    return this.resumesService.findAll(+curentPage, +limit, qs, user);
  }

  @Get(":id")
  @ResponseMessage("Fetch resume by ID")
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Post("by-user")
  @ResponseMessage("Fetch resume by user")
  findAllByUser(@User() user: IUser) {
    return this.resumesService.findAllByUser(user);
  }

  @Patch(":id")
  @ResponseMessage("Update a resume success")
  update(
    @Param('id') id: string,
    @Body("status") status: string,
    @User() user: IUser
  ) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a resume success")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
