import { Body, Controller, Get, OnApplicationBootstrap, Post, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { Response } from 'express';
import { VerificationCodeDto } from './dto/verificationCode.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { VerifyForgotPasswordDto } from './dto/verifyForgotPassword.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    @ApiResponse({status: 420, description: 'username already exists'})
    @ApiResponse({status: 421, description: 'email already exists'})
    @ApiResponse({status: 422, description: 'phone already exists'})
    @ApiResponse({status: 423, description: 'error creating user'})
    @ApiResponse({status: 220, description: 'created user successfully'})
    register(
        @Body() createUser: CreateUserDto,
        @Res() res: Response
    ){
        return this.authService.register(createUser, res);
    }

    @Post('/verificationCode')
    @ApiResponse({status: 424, description: 'user not found'})
    @ApiResponse({status: 425, description: 'incorrect verification code'})
    @ApiResponse({status: 426, description: 'error verifying the verification code'})
    @ApiResponse({status: 221, description: 'verification code successfully verified'})
    verificationCode(
        @Body() verificationCode: VerificationCodeDto,
        @Res() res: Response
    ) {
        return this.authService.verificationCode(verificationCode, res);
    }

    @Post('/login')
    @ApiResponse({status: 424, description: 'user not found'})
    @ApiResponse({status: 427, description: 'incorrect password'})
    @ApiResponse({status: 428, description: 'error login'})
    @ApiResponse({status: 429, description: 'you must active your account'})
    @ApiResponse({status: 222, description: 'login successfully'})
    login(
        @Body() login: LoginDto,
        @Res() res: Response
    ) {
        return this.authService.login(login, res);
    }

    @Post('/forgotPassword')
    @ApiResponse({status: 424, description: 'user not found'})
    @ApiResponse({status: 430, description: 'error forgot password'})
    @ApiResponse({status: 223, description: 'forgot password successfully'})
    forgotPassword(
        @Body() forgotPassword: ForgotPasswordDto,
        @Res() res: Response
    ) {
        return this.authService.forgotPassword(forgotPassword, res);
    }

    @Post('/verifyForgotPassword')
    @ApiResponse({status: 424, description: 'user not found'})
    @ApiResponse({status: 425, description: 'incorrect verification code'})
    @ApiResponse({status: 431, description: 'error verify forgot password'})
    @ApiResponse({status: 224, description: 'user not found'})
    verifyForgotPassword(
        @Body() verifyForgotPassword: VerifyForgotPasswordDto,
        @Res() res: Response
    ) {
        return this.authService.veriryForgotPassword(verifyForgotPassword, res);
    }
}
