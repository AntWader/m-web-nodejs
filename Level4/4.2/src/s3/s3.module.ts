import { Module } from "@nestjs/common";
import { S3Controller } from "./s3.controller";
import { S3Service } from "./s3.service";

/**
 * This module provides partial access to AWS S3 bucket, defined by S3Service functional.
 * Also uploaded files can be accessed through private connection from S3Controller.
 */
@Module({
    controllers: [S3Controller],
    providers: [S3Service]
})
export class S3Module { }