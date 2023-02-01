import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNumber, IsString, Validate } from 'class-validator';
import { IsEntityOrStringArray } from './create-person.dto';

export class CreatePlanetDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    rotation_period: number;

    @ApiProperty()
    @IsNumber()
    orbital_period: number;

    @ApiProperty()
    @IsNumber()
    diameter: number;

    @ApiProperty()
    @IsString()
    climate: string;

    @ApiProperty()
    @IsString()
    gravity: string;

    @ApiProperty()
    @IsString()
    terrain: string;

    @ApiProperty()
    @IsNumber()
    surface_water: number;

    @ApiProperty()
    @IsNumber()
    population: number;

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    species: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    residents: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    films: (string | { id: number })[];

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
