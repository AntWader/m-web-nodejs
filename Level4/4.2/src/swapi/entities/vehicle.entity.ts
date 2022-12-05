import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";
import { Person } from "./person.entity";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column()
    manufacturer: string;

    @Column()
    cost_in_credits: number;

    @Column()
    length: number;

    @Column()
    max_atmosphering_speed: number;

    @Column()
    crew: string;

    @Column()
    passengers: number;

    @Column()
    cargo_capacity: number;

    @Column()
    consumables: string;

    @Column()
    vehicle_class: string;

    @ManyToMany(() => Person,)
    pilots: Person[];

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
