import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    episode_id: number;

    @ApiProperty()
    director: string;

    @ApiProperty()
    producer: string;

    @ApiProperty()
    release_date: Date;

    @ApiProperty()
    opening_crawl: string;

    @ApiProperty()
    characters: string[];

    @ApiProperty()
    planets: string[];

    @ApiProperty()
    species: string[];

    @ApiProperty()
    starships: string[];

    @ApiProperty()
    vehicles: string[];

    @ApiProperty()
    created: Date;

    @ApiProperty()
    edited: Date;

    @ApiProperty()
    url: string;
}
