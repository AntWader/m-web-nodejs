import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { s3ControllerPath } from "./s3.config";
import { S3Service } from "./s3.service";
import { Request as RequestType, Response as ResponseType } from 'express';

@Controller(s3ControllerPath)
export class S3Controller {
    constructor(private readonly s3Service: S3Service) { }

    @Get(':key')
    getFile(@Param('key') key: string, @Res() res: ResponseType): StreamableFile | NodeJS.WritableStream {
        const file = this.s3Service.load(key);

        return new StreamableFile(file).getStream().pipe(res);
    }
}