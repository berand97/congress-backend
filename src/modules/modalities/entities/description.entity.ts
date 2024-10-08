import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Modality } from './modality.entity';

@Entity()
export class DescriptionItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @ManyToOne(() => Modality, modality => modality.descriptionItems)
    modality: Modality;
}