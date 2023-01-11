import { S3 } from "aws-sdk";
import { BUCKET_NAME, S3KEY, S3REGION, S3SECRETKEY, USER_NAME } from "../s3/S3Key";

export const s3ControllerPath = 's3/';

export const S3Config: S3.Types.ClientConfiguration = {
    region: S3REGION,
    accessKeyId: S3KEY,
    secretAccessKey: S3SECRETKEY,
}

export const bucketName = BUCKET_NAME;
export const userName = USER_NAME;