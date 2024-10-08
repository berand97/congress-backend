import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Authentication {
  @Column({ unique: true })
  @PrimaryGeneratedColumn("uuid")
  uid: number;

  @Column()
  @ApiProperty({
    description: '',
    type: String,
    required: true,
  })
  email: string;

  @Column()
  @ApiProperty({
    description: '',
    type: String,
    required: true,
  })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column('longtext', { select: false, nullable: true, default: null })
  @ApiProperty({ description: '', type: String, required: false })
  public readonly refreshToken?: string;
}
