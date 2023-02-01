import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {
    @ApiProperty()
    @IsString()
    gender: string;
}
