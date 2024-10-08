import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUniversityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    logo: string;
}
