import { IsDefined, IsEmail, IsString, Length } from "class-validator";

export class VerifyForgotPasswordDto {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @Length(6, 6)
    verificationCode: string;

    @IsDefined()
    @IsString()
    @Length(6)
    newPassword: string;
}