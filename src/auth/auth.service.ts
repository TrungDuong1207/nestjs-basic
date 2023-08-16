import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid) {
                return user
            }
        }
        return null;
    }

    async login(user: IUser) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        const refresh_token = this.createRefreshToken({name: "trung"})
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
            user: {
                _id,
                name,
                email,
                role
            }
        };
    }

    async register(registerUserDto: RegisterUserDto) {
        const isExist = this.userModel.findOne({ email: registerUserDto.email });
        if (isExist) {
            throw new BadRequestException(`the email ${registerUserDto.email} da ton tai tren he thong`);
        }
        const hashPassword = this.usersService.getHashPassword(registerUserDto.password)
        let user = await this.userModel.create({
            ...registerUserDto,
            password: hashPassword,
            role: "USER"
        })
        return user;
    }

    createRefreshToken = (payload) => {
       const refresh_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
        expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))/1000 //vì expireIn tinh theo giây mà thằng ms nó tính theo miligiay
       });
    return refresh_token
    }
}
