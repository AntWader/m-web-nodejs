import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Images {
    @PrimaryColumn()
    entity: string;

    @PrimaryColumn()
    id: number;

    @Column()
    src: string;
}
