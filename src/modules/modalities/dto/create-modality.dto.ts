import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { DescriptionItem } from "../entities/description.entity";

export class CreateModalityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsArray()
    @IsNotEmpty()
    descriptionItems: DescriptionItem[];

}
