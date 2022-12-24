import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";
import { Person } from "./person.entity";

@Entity()
export class Starship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column()
    manufacturer: string;

    @Column()
    cost_in_credits: string;

    @Column()
    length: string;

    @Column()
    max_atmosphering_speed: string;

    @Column()
    crew: string;

    @Column()
    passengers: string;

    @Column()
    cargo_capacity: string;

    @Column()
    consumables: string;

    @Column()
    hyperdrive_rating: string;

    @Column()
    MGLT: string;

    @Column()
    starship_class: string;

    @ManyToMany(() => Person, p => p.starships)
    @JoinTable()
    pilots: Person[];

    @ManyToMany(() => Film, f => f.starships)
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
