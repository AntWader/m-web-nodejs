import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Gender } from './gender.entity';
import { Images } from './image.entity';

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

    @ManyToOne(() => Gender, g => g.people, { cascade: ['insert', 'update'], })
    @JoinColumn()
    gender: Gender;

    @ManyToMany(() => Images, { cascade: ['insert', 'update'], })
    @JoinTable({
        name: "people_images",
        joinColumn: {
            name: "people_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "img_id",
            referencedColumnName: "id"
        }
    })
    images: Images[];
}
