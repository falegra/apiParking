import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/common/enum/role.enum";
import { HelpersService } from "src/helpers/helpers.service";
import { User } from "src/user/entities/user.entity";
import { UserModel } from "src/user/model/user.model";

@Injectable()
export class ClienteGuard implements CanActivate {
    constructor(
        private readonly userModel: UserModel,
        private readonly helpersService: HelpersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = this.helpersService.verifyToken(token);
            const {role}: User = await this.userModel.getUserByEmail(payload.email);

            if(!role) {
                throw new UnauthorizedException();
            }

            if(role !== Role.CLIENTE && role !== Role.EMPLEADO && role !== Role.ADMIN) {
                throw new UnauthorizedException();
            }

            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }
}