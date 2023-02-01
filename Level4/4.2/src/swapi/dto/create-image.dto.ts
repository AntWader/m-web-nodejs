import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty()
    @IsString()
    key: string;

    @ApiProperty()
    @IsString()
    src: string;
}
