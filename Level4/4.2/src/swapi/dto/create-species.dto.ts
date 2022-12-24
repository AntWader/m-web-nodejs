import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    classification: string;

    @ApiProperty()
    designation: string;

    @ApiProperty()
    average_height: number;

    @ApiProperty()
    skin_colors: string;

    @ApiProperty()
    hair_colors: string;

    @ApiProperty()
    eye_colors: string;

    @ApiProperty()
    average_lifespan: number;

    @ApiProperty()
    homeworld: string;

    @ApiProperty()
    language: string;

    @ApiProperty()
    people: string[];

    @ApiProperty()
    films: string[];

    @ApiProperty()
    created: Date;

    @ApiProperty()
    edited: Date;

    @ApiProperty()
    url: string;
}
