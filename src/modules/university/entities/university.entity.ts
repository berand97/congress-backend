import { Injectable } from '@nestjs/common';
import { Authentication } from 'src/modules/authentication/entities/authentication.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
@Injectable()
export class University {
  @Column({ unique: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;
}
