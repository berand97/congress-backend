import { Injectable } from '@nestjs/common';
import { Role } from '@role/entities/role.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
@Injectable()
export class Menu {
    @Column({ unique: true })
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column({ nullable: true })
    icon?: string;

    @ManyToMany(() => Role, role => role.menus)
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Menu, menu => menu.parent)
    submenus: Menu[];

    @ManyToOne(() => Menu, menu => menu.submenus, { nullable: true })
    parent?: Menu;
}