import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    src: string;

    @ManyToMany(() => Person, p => p.images)
    people: Person[];
}
