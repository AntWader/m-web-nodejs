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

    @Column()
    height: string;

    @Column()
    mass: string;

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

    @ManyToOne(() => Planet, p => p.residents,)
    @JoinColumn()
    homeworld: Planet;

    @ManyToMany(() => Film, f => f.characters)
    @JoinTable()
    films: Film[];

    @ManyToMany(() => Species, s => s.people)
    species: Species[];

    @ManyToMany(() => Vehicle, v => v.pilots)
    vehicles: Vehicle[];

    @ManyToMany(() => Starship, s => s.pilots)
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
