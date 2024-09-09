import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUser.dto";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    @Length(6, 6)
    verificationCode?: string;

    @IsOptional()
    @IsString()
    role?: string;
}