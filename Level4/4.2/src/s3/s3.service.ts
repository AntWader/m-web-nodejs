import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { bucketName, S3Config } from './s3.config';
import * as path from 'path';

const s3 = new S3(S3Config);

type uploadConfig = {
    uniqKey: boolean
}

@Injectable()
export class S3Service {

    upload(file: Express.Multer.File, config?: uploadConfig) {
        // uniq key generation, if config.uniqKey: true
        let fileKey: string = config?.uniqKey ?
            `${file.buffer.slice(0, 16).toString('hex')}${path.extname(file.originalname)}` :
            file.filename;

        const uploadParams: S3.Types.PutObjectRequest = {
            Bucket: bucketName,
            Body: file.buffer,
            Key: fileKey,
        }

        return s3.upload(uploadParams).promise();
    }

    load(fileKey: string) {
        const downloadParams: S3.Types.GetObjectAclRequest = {
            Bucket: bucketName,
            Key: fileKey,
        }

        return s3.getObject(downloadParams).createReadStream();
    }
}
