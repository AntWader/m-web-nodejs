import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    height: number;

    @ApiProperty()
    mass: number;

    @ApiProperty()
    hair_color: string;

    @ApiProperty()
    skin_color: string;

    @ApiProperty()
    eye_color: string;

    @ApiProperty()
    birth_year: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    homeworld: string;

    @ApiProperty()
    films: string[];

    @ApiProperty()
    species: string[];

    @ApiProperty()
    vehicles: string[];

    @ApiProperty()
    starships: string[];

    @ApiProperty()
    created: Date;

    @ApiProperty()
    edited: Date;

    @ApiProperty()
    url: string;
}
