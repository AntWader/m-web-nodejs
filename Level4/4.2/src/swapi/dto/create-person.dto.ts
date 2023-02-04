import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'entity-or-string', async: false })
export class IsEntityOrString implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        return typeof text === 'string' || typeof text.id === 'number';
    }
}

@ValidatorConstraint({ name: 'entity-array-or-string-array', async: false })
export class IsEntityOrStringArray implements ValidatorConstraintInterface {
    public async validate(array: any, args: ValidationArguments) {
        return Array.isArray(array) && array.reduce((a, b) => a && ((typeof b.id === 'number') || (typeof b === 'string')), true);
    }
}

export class CreatePersonDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    height: string;

    @ApiProperty()
    @IsString()
    mass: string;

    @ApiProperty()
    @IsString()
    hair_color: string;

    @ApiProperty()
    @IsString()
    skin_color: string;

    @ApiProperty()
    @IsString()
    eye_color: string;

    @ApiProperty()
    @IsString()
    birth_year: string;

    @ApiProperty({ default: "testGender" })
    @Validate(IsEntityOrString)
    gender: string | { id: number };

    @ApiProperty({ default: "testPlanet" })
    @Validate(IsEntityOrString)
    homeworld: string | { id: number };

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    films: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    species: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    vehicles: (string | { id: number })[];

    @ApiProperty()
    @IsArray()
    @Validate(IsEntityOrStringArray)
    starships: (string | { id: number })[];

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
