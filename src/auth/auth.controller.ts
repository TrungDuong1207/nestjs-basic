import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private rolesService: RolesService,

  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage("User Login")
  handleLogin(
    @Req() req: Request & { user },
    @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response)
  }

  @Get('/account')
  @ResponseMessage("get use infomation")
  async handleGetAccount(@User() user: IUser) {
    const temp = await this.rolesService.findOne(user.role._id) as any;
    user.permissions = temp.permissions;
    return { user };
  }

  @Public()
  @Get('/refresh')
  @ResponseMessage("Get user by refresh token")
  handleRereshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies["refresh_token"]
    return this.authService.processNewToken(refreshToken, response);
  }

  @Post('/logout')
  @ResponseMessage("Logout user")
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser
  ) {
    return this.authService.logout(response, user);
  }
}
