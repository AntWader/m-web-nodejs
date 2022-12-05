import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Film } from './film.entity';
import { Person } from './person.entity';
import { Species } from './species.entity';

@Entity()
export class Planet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rotation_period: number;

    @Column()
    orbital_period: number;

    @Column()
    diameter: number;

    @Column()
    climate: string;

    @Column()
    gravity: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: number;

    @Column()
    population: number;

    @OneToMany(() => Species, s => s.homeworld,)
    species: Species[];

    @OneToMany(() => Person, p => p.homeworld,)
    residents: Person[];

    @ManyToMany(() => Film,)
    @JoinTable()
    films: Film[];

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