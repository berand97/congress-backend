import { IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMenuDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena.' })
    name: string;

    @IsNotEmpty({ message: 'La ruta no puede estar vacía.' })
    @IsString({ message: 'La ruta debe ser una cadena.' })
    path: string;

    @IsOptional()
    @IsString({ message: 'El icono debe ser una cadena.' })
    icon?: string;

    @IsArray({ message: 'Los roles deben ser un array de UUIDs.' })
    @IsUUID('all', { each: true, message: 'Cada rol debe ser un UUID válido.' })
    roles: string[];

    @IsOptional()
    @IsArray({ message: 'Los submenús deben ser un array.' })
    @ValidateNested({ each: true })
    @Type(() => CreateMenuDto)
    submenus?: CreateMenuDto[];

    @IsOptional()
    @IsUUID('all', { message: 'El padre debe ser un UUID válido.' })
    parent?: string;
}