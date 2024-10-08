import { Injectable } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@Injectable()
export class Sponsor {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    url: string;

    @Column()
    order: number;
}