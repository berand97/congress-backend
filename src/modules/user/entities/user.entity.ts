import { Role } from "@modules/roles/entities/role.entity";
import { University } from "@modules/university/entities/university.entity";
import { Injectable } from "@nestjs/common";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@Injectable()
export class User {
    @Column({ unique: true })
    @PrimaryGeneratedColumn("uuid")
    uid: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, role => role.id)
    role: Role;

    @ManyToOne(() => University, university => university.id)
    university?: University;
}
