import { S3 } from "aws-sdk";

export const s3ControllerPath = 's3/';

export const S3Config: S3.Types.ClientConfiguration = {
    region: S3REGION,
    accessKeyId: S3KEY,
    secretAccessKey: S3SECRETKEY,
}

export const bucketName = "m-node-js-4";
export const userName = "m-node-js-4-user";