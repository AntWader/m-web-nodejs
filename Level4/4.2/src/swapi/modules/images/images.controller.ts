import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, ParseIntPipe, PipeTransform, UseGuards, Req, Header, StreamableFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { UpdateImageDto } from '../../dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiBodyOptions, ApiConsumes } from '@nestjs/swagger';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Roles } from '../../../auth/roles/roles.decorator';
import { RolesGuard } from '../../../auth/roles/roles.guard';
import { S3Service } from '../../../s3/s3.service';
import { Request as RequestType, Response as ResponseType } from 'express';
import { s3ControllerPath } from '../../../s3/s3.config';

const multerConfig: MulterOptions = {};
// const multerConfig: MulterOptions = {
//   storage: diskStorage({
//     destination: './uploads',
//     filename: (req, file, callback) => {
//       callback(null, file.originalname)
//     },
//   }),
// };

const apiConfig: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      img: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

const parseImgPipe: PipeTransform<any, any> = new ParseFilePipe({
  validators: [
    new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png)$/ }),
  ],
});

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly s3Service: S3Service
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('img', multerConfig))
  @ApiConsumes('multipart/form-data') // swagger
  @ApiBody(apiConfig) // swagger
  async uploadImg(
    @UploadedFile(parseImgPipe) file: Express.Multer.File,
    @Req() req: RequestType,
  ) {
    console.log(file);

    const s3res = await this.s3Service.upload(file, { uniqKey: true });
    console.log(s3res);

    const s3URL = `${req.protocol}://${req.get('Host')}/${s3ControllerPath}${s3res.Key}`;
    console.log(s3URL);

    return this.imagesService.create({ key: s3res.Key, src: s3URL });
  }

  @Post(':personId')
  @UseInterceptors(FileInterceptor('img', multerConfig))
  @ApiConsumes('multipart/form-data') // swagger
  @ApiBody(apiConfig) // swagger
  async uploadAndLinkImg(
    @UploadedFile(parseImgPipe) file: Express.Multer.File,
    @Req() req: RequestType,
    @Param('personId', ParseIntPipe) personId: number
  ) {
    console.log(file);

    const s3res = await this.s3Service.upload(file, { uniqKey: true });
    console.log(s3res);

    const s3URL = `${req.protocol}://${req.get('Host')}/${s3ControllerPath}${s3res.Key}`;
    console.log(s3URL);

    return this.imagesService.createAndLink(personId, { key: s3res.Key, src: s3URL });
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImageDto: UpdateImageDto
  ) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(id);
  }
}
