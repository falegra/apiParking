import { Injectable } from '@nestjs/common';
import { UserModel } from './model/user.model';
import { Response } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class UserService {
    constructor(
        private readonly userModel: UserModel
    ) {}

    async updateUser(
        id: number,
        {email, phone, username, name, lastName}: UpdateUserDto,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getSecureUserById(id);

            if(!userDb) return res.sendStatus(424);

            await this.userModel.updateUser(id, {email, phone, username, name, lastName});

            return res.sendStatus(239);
        } catch (error) {
            this.handleLog('updateUser', error);
            return res.sendStatus(452);
        }
    }

    async changeToEmployee(
        id: number,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getSecureUserById(id);

            if(!userDb) return res.sendStatus(424);

            await this.userModel.updateUser(id, {role: Role.EMPLEADO});

            return res.sendStatus(240);
        } catch (error) {
            this.handleLog('changeToEmployee', error);
            return res.sendStatus(453);
        }
    }




    private handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - user.service.ts`);
        console.log(error.message);
    }
}
