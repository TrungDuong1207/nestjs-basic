import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://trung:Trung142696!@cluster0.z5ztbaa.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
