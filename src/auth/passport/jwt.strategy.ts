import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<String>("JWT_ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, company, role } = payload;

    const userRole = role as unknown as { _id: string; name: string }
    const temp = await this.rolesService.findOne(userRole._id);

    if (temp instanceof BadRequestException) {
      // Xử lý lỗi ở đây nếu cần
      return null;
    }

    return {
      _id,
      name,
      email,
      company,
      role,
      permissions: temp?.permissions ?? []
    };
  }
}