import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @OneToMany(() => Person, p => p.gender,)
    people: Person[];
}