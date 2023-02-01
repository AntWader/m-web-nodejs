import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString, Validate } from 'class-validator';
import { IsEntityOrStringArray } from './create-person.dto';

export class CreateFilmDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    episode_id: number;

    @ApiProperty()
    @IsString()
    director: string;

    @ApiProperty()
    @IsString()
    producer: string;

    @ApiProperty()
    @IsString()
    release_date: Date;

    @ApiProperty()
    @IsString()
    opening_crawl: string;

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    characters: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    planets: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    species: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    starships: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    vehicles: (string | { id: number })[];

    @ApiProperty()
    @IsDateString()
    created: Date;

    @ApiProperty()
    @IsDateString()
    edited: Date;

    @ApiProperty()
    @IsString()
    url: string;
}
