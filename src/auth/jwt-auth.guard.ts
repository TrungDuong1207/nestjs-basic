import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    //hàm này lấy thông tin từ jwt.strategy
    handleRequest(err, user, info, context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const isSKipPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
            context.getHandler(),
            context.getClass(),
        ]);

        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException("Token khong hơp le or khong co bearrer token ở header");
        }

        //check permissions
        const targetMethod = request.method;
        const targetEndpoint = request.route?.path as string;

        const permissions = user?.permissions ?? [];
        let isExist = permissions.find(permission =>
            targetMethod === permission.method
            &&
            targetEndpoint === permission.apiPath
        )
        if (targetEndpoint.startsWith("/api/v1/auth")) isExist = true;
        if (targetEndpoint.startsWith("/api/v1/jobs/admin")) isExist = true;
        if (!isExist && !isSKipPermission) {
            throw new ForbiddenException("bạn không có quyền để truy cập endpoint này")
        }
        return user;
    }

}
