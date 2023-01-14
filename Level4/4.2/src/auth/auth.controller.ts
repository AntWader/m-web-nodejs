import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { Request as RequestType } from 'express';
import { UserLoginDto } from "../auth/auth_users/users.login.dto";
import { LocalAuthGuard } from "./local/local.auth.guard";

@Controller()
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: UserLoginDto })
    @Post()
    async login(@Request() req: RequestType) {
        return req.user;
    }
}