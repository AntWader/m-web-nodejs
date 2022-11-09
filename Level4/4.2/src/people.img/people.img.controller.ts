import { Controller, Get, Post, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { PeopleImgService } from './people.img.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller()
export class PeopleImgController {
  constructor(private readonly peopleImgService: PeopleImgService) { }

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
  @ApiConsumes('multipart/form-data')
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
  })
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png)$/ }),
      ],
    })
  ) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number) {
    console.log(`middleware uploading...`);
    console.log(file);

    return this.peopleImgService.create({ "id": id, "src": file.path });
  }

  @Get()
  findAll() {
    return this.peopleImgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peopleImgService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleImgService.remove(id);
  }
}
