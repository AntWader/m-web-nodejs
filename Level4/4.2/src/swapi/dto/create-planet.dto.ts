import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    rotation_period: number;

    @ApiProperty()
    orbital_period: number;

    @ApiProperty()
    diameter: number;

    @ApiProperty()
    climate: string;

    @ApiProperty()
    gravity: string;

    @ApiProperty()
    terrain: string;

    @ApiProperty()
    surface_water: number;

    @ApiProperty()
    population: number;

    @ApiProperty()
    species: string[];

    @ApiProperty()
    residents: string[];

    @ApiProperty()
    films: string[];

    @ApiProperty()
    created: Date;

    @ApiProperty()
    edited: Date;

    @ApiProperty()
    url: string;
}
