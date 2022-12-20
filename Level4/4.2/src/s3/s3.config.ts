import { S3 } from "aws-sdk";

export const s3ControllerPath = 's3/';

const S3REGION = "eu-central-1";
const S3KEY = "AKIASAT5PM3P5SO3EWG7";
const S3SECRETKEY = "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";

export const S3Config: S3.Types.ClientConfiguration = {
    region: S3REGION,
    accessKeyId: S3KEY,
    secretAccessKey: S3SECRETKEY,
}

export const bucketName = "m-node-js-4";
export const userName = "m-node-js-4-user";