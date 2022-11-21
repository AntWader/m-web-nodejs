import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Gender } from './gender.entity';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("int")
    height: number;

    @Column("int")
    mass: number;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @OneToOne(() => Gender, { cascade: true, })
    @JoinColumn()
    gender: Gender;

    @Column()
    homeworld: string;

    @Column("simple-array")
    films: string[];

    @Column("simple-array")
    species: string[];

    @Column("simple-array")
    vehicles: string[];

    @Column("simple-array")
    starships: string[];

    @Column("timestamp", {
        transformer: {
            from: (value: string) => value,
            to: (value: string) => new Date(value)
        }
    })
    created: Date;

    @Column("timestamp", {
        transformer: {
            from: (value: string) => value,
            to: (value: string) => new Date(value)
        }
    })
    edited: Date;

    @Column()
    url: string;
}
