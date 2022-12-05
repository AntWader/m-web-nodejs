import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";
import { Person } from "./person.entity";
import { Planet } from "./planet.entity";

@Entity()
export class Species {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    classification: string;

    @Column()
    designation: string;

    @Column()
    average_height: number;

    @Column()
    skin_colors: string;

    @Column()
    hair_colors: string;

    @Column()
    eye_colors: string;

    @Column()
    average_lifespan: number;

    @ManyToOne(() => Planet,)
    @JoinColumn()
    homeworld: Planet;

    @Column()
    language: string;

    @ManyToMany(() => Person,)
    people: Person[];

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
