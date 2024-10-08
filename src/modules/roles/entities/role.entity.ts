import { Menu } from '@menu/entities/menu.entity';
import { Injectable } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
@Injectable()
export class Role {
    @Column({ unique: true })
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @Column()
    role: string;

    @Column()
    description: string;

    @ManyToMany(() => Menu, menu => menu.roles)
    menus: Menu[];
}
