import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Person } from './person.entity';
import { Planet } from './planet.entity';
import { Species } from './species.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    episode_id: number;

    @Column()
    opening_crawl: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column("date", {
        transformer: {
            from: (value: string) => value,
            to: (value: string) => new Date(value)
        }
    })
    release_date: Date;

    @ManyToMany(() => Person,)
    characters: Person[];

    @ManyToMany(() => Planet,)
    planets: Planet[];

    @ManyToMany(() => Starship,)
    starships: Starship[];

    @ManyToMany(() => Vehicle,)
    vehicles: Vehicle[];

    @ManyToMany(() => Species,)
    species: Species[];

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
