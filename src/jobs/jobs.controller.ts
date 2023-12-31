import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @ResponseMessage("Create a new job success")
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage("Fetch job with paginate")
  findAll(
    @Query("current") curentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+curentPage, +limit, qs);
  }

  @Get("/admin")
  @ResponseMessage("Fetch job with paginate")
  findAllJobHR(
    @Query("current") curentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
    @User() user: IUser
  ) {
    return this.jobsService.findAllJobHR(+curentPage, +limit, qs, user);
  }

  @Get(":id")
  @Public()
  @ResponseMessage("Fetch job by ID")
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(":id")
  @ResponseMessage("Update a job success")
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a job success")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
