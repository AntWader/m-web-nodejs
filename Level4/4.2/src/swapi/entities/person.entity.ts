import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Film } from './film.entity';
import { Gender } from './gender.entity';
import { Image } from './image.entity';
import { Planet } from './planet.entity';
import { Species } from './species.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Image, { cascade: ['insert', 'update'], eager: true })
    @JoinTable()
    images: Image[];

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

    @ManyToOne(() => Gender, g => g.people, { cascade: ['insert', 'update'], eager: true })
    @JoinColumn()
    gender: Gender;

    @ManyToOne(() => Planet, g => g.residents,)
    @JoinColumn()
    homeworld: Planet;

    @ManyToMany(() => Film,)
    @JoinTable()
    films: Film[];

    @ManyToMany(() => Species,)
    @JoinTable()
    species: Species[];

    @ManyToMany(() => Vehicle,)
    @JoinTable()
    vehicles: Vehicle[];

    @ManyToMany(() => Starship,)
    @JoinTable()
    starships: Starship[];

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
