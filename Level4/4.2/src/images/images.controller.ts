import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, ParseIntPipe, Req } from '@nestjs/common';
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post(':id')
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, file.originalname)
      },
    }),
  }
  )) // 👈 field name must match
  @ApiConsumes('multipart/form-data') // swagger
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        img: { // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  }) // swagger
  uploadFile(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png)$/ }),
        ],
      })
    ) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number) {
    console.log(`middleware uploading...`);
    console.log(file);
    let entityName = req.originalUrl.split('/').slice(-3)[0]; // for example: ../NAME/img/1
    console.log(entityName)

    return this.imagesService.create({ "entity": entityName, "id": id, "src": file.path });
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
