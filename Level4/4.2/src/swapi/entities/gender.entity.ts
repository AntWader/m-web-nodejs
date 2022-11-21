import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;
}