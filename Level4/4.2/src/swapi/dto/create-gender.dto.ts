import { ApiProperty } from "@nestjs/swagger";

export class CreateGenderDto {
    @ApiProperty()
    gender: string;
}
