import { ApiProperty } from "@nestjs/swagger";

export class CreatePeopleImgDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    src: string;
}
