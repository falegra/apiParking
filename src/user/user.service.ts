import { Injectable } from '@nestjs/common';
import { UserModel } from './model/user.model';
import { Response } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';

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




    handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - user.service.ts`);
        console.log(error.message);
    }
}
