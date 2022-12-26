import { Module } from "@nestjs/common";
import { S3Controller } from "./s3.controller";
import { S3Service } from "./s3.service";

/**
 * This module provides partial access to AWS S3 bucket, defined by S3Service functional.
 * Also uploaded files can be accessed through private connection from S3Controller.
 * 
 * You need to place S3Keys.ts file (with constants: S3REGION, S3KEY, S3SECRETKEY, BUCKET_NAME, USER_NAME) 
 * in the root of project to access you bucket!!!
 */
@Module({
    controllers: [S3Controller],
    providers: [S3Service]
})
export class S3Module { }