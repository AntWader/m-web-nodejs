import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
    @ApiProperty()
    key: string;

    @ApiProperty()
    src: string;
}
