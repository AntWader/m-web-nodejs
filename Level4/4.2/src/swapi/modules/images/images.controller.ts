import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, ParseIntPipe, Req, PipeTransform } from '@nestjs/common';
import { ImagesService } from './images.service';
import { UpdateImageDto } from '../../dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiBodyOptions, ApiConsumes } from '@nestjs/swagger';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      callback(null, file.originalname)
    },
  }),
};

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

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('img', multerConfig))
  @ApiConsumes('multipart/form-data') // swagger
  @ApiBody(apiConfig) // swagger
  uploadImg(@UploadedFile(parseImgPipe) file: Express.Multer.File) {
    console.log(file);

    return this.imagesService.create({ src: file.path });
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('img', multerConfig))
  @ApiConsumes('multipart/form-data') // swagger
  @ApiBody(apiConfig) // swagger
  uploadAndLinkImg(
    @UploadedFile(parseImgPipe) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number) {
    console.log(file);

    return this.imagesService.createAndLink(id, { src: file.path });
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
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
