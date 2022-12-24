import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
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
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    diameter: string;

    @Column()
    climate: string;

    @Column()
    gravity: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @Column()
    population: string;

    @OneToMany(() => Species, s => s.homeworld,)
    species: Species[];

    @OneToMany(() => Person, p => p.homeworld,)
    residents: Person[];

    @ManyToMany(() => Film, f => f.planets)
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