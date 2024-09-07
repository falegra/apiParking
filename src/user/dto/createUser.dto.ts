import { IsDefined, IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @Length(3)
    username: string;

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @Length(6)
    password: string;

    @IsDefined()
    @IsString()
    @Length(6)
    phone: string;

    @IsDefined()
    @IsString()
    @Length(3)
    name: string;

    @IsDefined()
    @IsString()
    @Length(3)
    lastName: string;
}