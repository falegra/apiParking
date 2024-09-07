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

    private handleLog(
        description: string,
        error: any
    ) {
        console.log(`[ERROR] - ${description} - user.model.ts`);
        console.log(error.message);
    }

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

            delete userDb.password;
            delete userDb.createdAt;
            delete userDb.verificationCode;

            return userDb;
        } catch (error) {
            this.handleLog('getUserById', error);
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

            delete userDb.password;
            delete userDb.createdAt;
            delete userDb.verificationCode;

            return userDb;
        } catch (error) {
            this.handleLog('getUserByUsername', error);
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

            delete userDb.password;
            delete userDb.createdAt;
            delete userDb.verificationCode;

            return userDb;
        } catch (error) {
            this.handleLog('getUserByEmail', error);
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

            delete userDb.password;
            delete userDb.createdAt;
            delete userDb.verificationCode;

            return userDb;
        } catch (error) {
            this.handleLog('getUserByPhone', error);
        }
    }

    async createUser(
        {email, lastName, name, password, phone, username}: CreateUserDto
    ) {
        try {
            const verificationCode = this.helpersService.generate_activation_code();
            const hashPassword = this.helpersService.hash_password(password);
            const createdAt: string = new Date().getTime() + '';

            const infoEmail = await this.helpersService.send_email({
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
        }
    }
}