import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Validate } from 'class-validator';
import { IsEntityOrString, IsEntityOrStringArray } from './create-person.dto';

export class CreateSpeciesDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    classification: string;

    @ApiProperty()
    @IsString()
    designation: string;

    @ApiProperty()
    @IsNumber()
    average_height: number;

    @ApiProperty()
    @IsString()
    skin_colors: string;

    @ApiProperty()
    @IsString()
    hair_colors: string;

    @ApiProperty()
    @IsString()
    eye_colors: string;

    @ApiProperty()
    @IsNumber()
    average_lifespan: number;

    @ApiProperty({ default: "testPlanet" })
    @Validate(IsEntityOrString)
    homeworld: string | { id: number };

    @ApiProperty()
    @IsString()
    language: string;

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    people: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    films: (string | { id: number })[];

    @ApiProperty()
    created: Date;

    @ApiProperty()
    edited: Date;

    @ApiProperty()
    url: string;
}
