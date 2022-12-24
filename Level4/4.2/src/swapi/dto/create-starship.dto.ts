import { ApiProperty } from '@nestjs/swagger';

export class CreateStarshipDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    model: string;

    @ApiProperty()
    manufacturer: string;

    @ApiProperty()
    cost_in_credits: number;

    @ApiProperty()
    length: number;

    @ApiProperty()
    max_atmosphering_speed: number;

    @ApiProperty()
    crew: string;

    @ApiProperty()
    passengers: number;

    @ApiProperty()
    cargo_capacity: number;

    @ApiProperty()
    consumables: string;

    @ApiProperty()
    hyperdrive_rating: number;

    @ApiProperty()
    MGLT: number;

    @ApiProperty()
    starship_class: string;

    @ApiProperty()
    pilots: string[];

    @ApiProperty()
    films: string[];

    @ApiProperty()
    created: Date;

    @ApiProperty()
    edited: Date;

    @ApiProperty()
    url: string;
}
