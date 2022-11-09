import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonImg {
    @PrimaryColumn()
    id: number;

    @Column()
    src: string;
}
