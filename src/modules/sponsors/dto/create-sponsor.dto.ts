import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSponsorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    order: number;
}