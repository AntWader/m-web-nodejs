import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Validate } from 'class-validator';
import { IsEntityOrStringArray } from './create-person.dto';

export class CreateVehicleDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    model: string;

    @ApiProperty()
    @IsString()
    manufacturer: string;

    @ApiProperty()
    @IsNumber()
    cost_in_credits: number;

    @ApiProperty()
    @IsNumber()
    length: number;

    @ApiProperty()
    @IsNumber()
    max_atmosphering_speed: number;

    @ApiProperty()
    @IsString()
    crew: string;

    @ApiProperty()
    @IsNumber()
    passengers: number;

    @ApiProperty()
    @IsNumber()
    cargo_capacity: number;

    @ApiProperty()
    @IsString()
    consumables: string;

    @ApiProperty()
    @IsString()
    vehicle_class: string;

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    pilots: (string | { id: number })[];

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
