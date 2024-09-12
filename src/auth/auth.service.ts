import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Response } from 'express';
import { HelpersService } from 'src/helpers/helpers.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/entities/user.entity';
import { UserModel } from 'src/user/model/user.model';
import { VerificationCodeDto } from './dto/verificationCode.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { VerifyForgotPasswordDto } from './dto/verifyForgotPassword.dto';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
    constructor(
        private readonly userModel: UserModel,
        private helpersService: HelpersService
    ) {}

    async onApplicationBootstrap() {
        try {
            let userDb: User = await this.userModel.getUserByUsername('admin');

            if(!userDb) {
                const savedUser: User = await this.userModel.createUser({
                    email: 'admin@parking.cu',
                    username: 'admin',
                    name: 'Parking',
                    lastName: 'Parking',
                    phone: '55555555',
                    password: '1231233'
                });

                await this.userModel.updateUser(savedUser.id, {
                    verificationCode: null,
                    isActive: true,
                    role: Role.ADMIN
                });

                console.log(`created admin user`);
            }
            else {
                console.log(`admin user already exists`);
            }
        } catch (error) {
            this.handleLog('onApplicationBootstrap', error);
        }
    }

    async register(
        {email, lastName, name, password, phone, username}: CreateUserDto,
        res: Response
    ) {
        try {
            let userDb: User = await this.userModel.getSecureUserByUsername(username);

            if(userDb) {
                return res.sendStatus(420);
            }
            console.log(`no existe el username`);

            userDb = await this.userModel.getSecureUserByEmail(email);

            if(userDb) {
                return res.sendStatus(421);
            }
            console.log(`no existe el email`);

            userDb = await this.userModel.getSecureUserByPhone(phone);

            if(userDb) {
                return res.sendStatus(422);
            }
            console.log(`no existe el phone`);

            const savedUser: User = await this.userModel.createUser({
                email,
                lastName,
                name,
                password,
                phone,
                username
            });

            if(!savedUser) {
                return res.sendStatus(423);
            }

            return res.sendStatus(220);
        } catch (error) {
            this.handleLog('register', error);
            return res.sendStatus(423);
        }
    }

    async verificationCode(
        {username, verificationCode}: VerificationCodeDto,
        res: Response
    ) {
        try {
            let userDb: User = await this.userModel.getSecureUserByUsername(username);

            if(!userDb) {
                userDb = await this.userModel.getSecureUserByEmail(username);
            }

            if(!userDb) {
                return res.sendStatus(424);
            }

            if(userDb.verificationCode !== verificationCode) {
                return res.sendStatus(425);
            }

            await this.userModel.updateUser(userDb.id, {
                isActive: true,
                verificationCode: null
            });

            return res.sendStatus(221);
        } catch (error) {
            this.handleLog('verificationCode', error);
            return res.sendStatus(426);
        }
    }

    async login(
        {username, password}: LoginDto,
        res: Response
    ) {
        try {
            let userDb: User = await this.userModel.getSecureUserByUsername(username);

            if(!userDb) {
                userDb = await this.userModel.getSecureUserByEmail(username);
            }

            if(!userDb) {
                return res.sendStatus(424);
            }

            if(!userDb.isActive) {
                return res.sendStatus(429);
            }

            if(!this.helpersService.verifyPassword(password, userDb.password)) {
                return res.sendStatus(427);
            }

            const token = this.helpersService.generateToken({
                email: userDb.email,
            }, false);

            return res.status(222).json({token});
        } catch (error) {
            this.handleLog('login', error);
            return res.sendStatus(428);
        }
    }

    async forgotPassword(
        {email}: ForgotPasswordDto,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getSecureUserByEmail(email);

            if(!userDb) {
                return res.sendStatus(424);
            }

            const verificationCode = this.helpersService.generateActivationCode();

            const infoEmail = await this.helpersService.sendEmail({
                to: email,
                subject: 'Verification Code',
                text: `Your verification code to reset your password is ${verificationCode}`
            });

            if(infoEmail) {
                await this.userModel.updateUser(userDb.id, {
                    verificationCode
                });

                return res.sendStatus(223);
            }
            else {
                return res.sendStatus(430);
            }
        } catch (error) {
            this.handleLog('forgotPassword', error);
            return res.sendStatus(430);
        }
    }

    async veriryForgotPassword(
        {email, verificationCode, newPassword}: VerifyForgotPasswordDto,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getSecureUserByEmail(email);

            if(!userDb) {
                return res.sendStatus(424);
            }

            if(userDb.verificationCode !== verificationCode) {
                return res.sendStatus(425);
            }

            await this.userModel.updateUser(userDb.id, {
                verificationCode: null,
                password: this.helpersService.hashPassword(newPassword)
            });

            return res.sendStatus(224);
        } catch (error) {
            this.handleLog('veriryForgotPassword', error);
            return res.sendStatus(431);
        }
    }



    handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - auth.service.ts`);
        console.log(error.message);
    }
}
