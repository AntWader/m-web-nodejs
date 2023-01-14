import { Controller, Get, Param, Req, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { s3ControllerPath } from "./s3.config";
import { S3Service } from "./s3.service";
import { Request as RequestType, Response as ResponseType } from 'express';
import { RolesGuard } from "../auth/roles/roles.guard";
import { Roles } from "../auth/roles/roles.decorator";

@UseGuards(RolesGuard)
@Roles('admin', 'user')
@Controller(s3ControllerPath)
export class S3Controller {
    constructor(private readonly s3Service: S3Service) { }

    @Get(':key')
    getFile(@Param('key') key: string, @Req() req: RequestType, @Res() res: ResponseType): StreamableFile | NodeJS.WritableStream {
        // generate console massage about file load method
        process.stdout.write(` -> attempt to load file from AWS S3 bucket`);

        const file = this.s3Service.load(key);

        return new StreamableFile(file).getStream().pipe(res);
    }
}