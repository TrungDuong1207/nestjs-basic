import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from 'ms';
import { RolesService } from 'src/roles/roles.service';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rolesService: RolesService,

    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid) {
                const userRole = user.role as unknown as { _id: string; name: string }
                const temp = await this.rolesService.findOne(userRole._id);

                if (temp instanceof BadRequestException) {
                    // Xử lý lỗi ở đây nếu cần
                    return null;
                }

                const objUser = {
                    ...user.toObject(),
                    permissions: temp?.permissions ?? []
                }
                return objUser
            }
        }
        return null;
    }

    async login(user: IUser, response: Response) {
        const { _id, name, email, company, role, permissions } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            company,
            role
        };
        const refresh_token = this.createRefreshToken(payload)

        await this.usersService.updateUserToken(refresh_token, _id)

        //set refresh token as cookies 
        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")),//miligiay  
        });

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id,
                name,
                email,
                role,
                permissions
            }
        };
    }

    createRefreshToken = (payload) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")) / 1000 //vì expireIn tinh theo giây mà thằng ms nó tính theo miligiay
        });
        return refresh_token
    }

    processNewToken = async (refreshToken: string, response: Response) => {
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET")
            })

            let user = await this.usersService.findUserByToken(refreshToken)
            if (user) {
                //update refresh token
                const { _id, name, email, role } = user;
                const payload = {
                    sub: "token refresh",
                    iss: "from server",
                    _id,
                    name,
                    email,
                    role
                };
                const refresh_token = this.createRefreshToken(payload)

                await this.usersService.updateUserToken(refresh_token, _id.toString());

                const userRole = user.role as unknown as { _id: string; name: string }
                const temp = await this.rolesService.findOne(userRole._id);

                //set refresh token as cookies
                response.clearCookie("refresh_token");
                response.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")),//miligiay  
                });

                if (temp instanceof BadRequestException) {
                    // Xử lý lỗi ở đây nếu cần
                    return null;
                }

                return {
                    access_token: this.jwtService.sign(payload),
                    user: {
                        _id,
                        name,
                        email,
                        role,
                        permissions: temp?.permissions ?? []
                    }
                };

            } else {
                throw new BadRequestException(`Refresh token khong hop le. vui long login`)
            }
        } catch (e) {
            throw new BadRequestException(`Refresh token khong hop le. vui long login`)
        }
    }

    logout = async (response: Response, user: IUser) => {
        await this.usersService.updateUserToken("", user._id);
        response.clearCookie("refresh_token");
        return "ok"
    }
}
