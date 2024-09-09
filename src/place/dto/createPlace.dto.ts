import { IsDefined, IsString, Length } from "class-validator";

export class CreatePlaceDto {
    @IsDefined()
    @IsString()
    @Length(3)
    description: string;
}