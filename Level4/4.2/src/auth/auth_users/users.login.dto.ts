import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @ApiProperty({ default: 'user' })
    username: string;

    @ApiProperty({ default: 'password' })
    password: string;
}
