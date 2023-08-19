import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://trung:Trung142696!@cluster0.z5ztbaa.mongodb.net/test'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
