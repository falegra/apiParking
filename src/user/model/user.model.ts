import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/createUser.dto";
import { HelpersService } from "src/helpers/helpers.service";
import { UpdateUserDto } from "../dto/updateUser.dto";

@Injectable()
export class UserModel {
    constructor (
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly helpersService: HelpersService
    ) {}

    async getSecureUserById(
        id: number
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    id
                }
            });

            return userDb;
        } catch (error) {
            this.handleLog('getSecureUserById', error);
            throw new Error(error.message);
        }
    }

    async getSecureUserByUsername(
        username: string
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    username
                }
            });

            return userDb;
        } catch (error) {
            this.handleLog('getSecureUserByUsername', error);
            throw new Error(error.message);
        }
    }

    async getSecureUserByEmail(
        email: string
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    email
                }
            });

            return userDb;
        } catch (error) {
            this.handleLog('getSecureUserByEmail', error);
            throw new Error(error.message);
        }
    }

    async getSecureUserByPhone(
        phone: string
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    phone
                }
            });

            return userDb;
        } catch (error) {
            this.handleLog('getSecureUserByPhone', error);
            throw new Error(error.message);
        }
    }

    async getUserById(
        id: number
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    id
                }
            });

            if(userDb) {
                delete userDb.password;
                delete userDb.createdAt;
                delete userDb.verificationCode;
            }

            return userDb;
        } catch (error) {
            this.handleLog('getUserById', error);
            throw new Error(error.message);
        }
    }

    async getUserByUsername(
        username: string
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    username
                }
            });

            if(userDb) {
                delete userDb.password;
                delete userDb.createdAt;
                delete userDb.verificationCode;
            }

            return userDb;
        } catch (error) {
            this.handleLog('getUserByUsername', error);
            throw new Error(error.message);
        }
    }

    async getUserByEmail(
        email: string
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    email
                }
            });

            if(userDb) {
                delete userDb.password;
                delete userDb.createdAt;
                delete userDb.verificationCode;
            }

            return userDb;
        } catch (error) {
            this.handleLog('getUserByEmail', error);
            throw new Error(error.message);
        }
    }

    async getUserByPhone(
        phone: string
    ) {
        try {
            const userDb: User = await this.userRepository.findOne({
                where: {
                    phone
                }
            });

            if(userDb) {
                delete userDb.password;
                delete userDb.createdAt;
                delete userDb.verificationCode;
            }

            return userDb;
        } catch (error) {
            this.handleLog('getUserByPhone', error);
            throw new Error(error.message);
        }
    }

    async createUser(
        {email, lastName, name, password, phone, username}: CreateUserDto
    ) {
        try {
            const verificationCode = this.helpersService.generateActivationCode();
            const hashPassword = this.helpersService.hashPassword(password);
            const createdAt: string = new Date().getTime() + '';

            const infoEmail = await this.helpersService.sendEmail({
                to: email,
                subject: 'Verification Code',
                text: `Welcome to our platform, your verification code is ${verificationCode}`
            });

            if(infoEmail) {
                const savedUser: User = await this.userRepository.save(this.userRepository.create({
                    name,
                    lastName,
                    username,
                    password: hashPassword,
                    email,
                    phone,
                    verificationCode,
                    createdAt
                }));

                return savedUser;
            }
            else {
                return null;
            }
        } catch (error) {
            this.handleLog('createUser', error);
            throw new Error(error.message);
        }
    }

    async updateUser(
        id: number,
        updateUser: UpdateUserDto
    ) {
        try {
            const updatedUser = await this.userRepository.update(id, updateUser);

            return updatedUser;
        } catch (error) {
            this.handleLog('updateUser', error);
            throw new Error(error.message);
        }
    }








    private handleLog(
        description: string,
        error: any
    ) {
        console.log(`[ERROR] - ${description} - user.model.ts`);
        console.log(error.message);
    }
}