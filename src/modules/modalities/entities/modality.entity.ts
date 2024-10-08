import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DescriptionItem } from './description.entity';

@Entity()
export class Modality {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    name: string;

    @OneToMany(() => DescriptionItem, descriptionItem => descriptionItem.modality)
    descriptionItems: DescriptionItem[];

    @Column()
    price: number;

    @Column()
    status: boolean;

    @Column()
    url: string;

}
