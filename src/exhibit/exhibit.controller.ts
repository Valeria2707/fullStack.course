import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExhibitService } from './exhibit.service';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('exhibits')
export class ExhibitController {
  constructor(private readonly exhibitService: ExhibitService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Створення нового експоната' })
  @ApiResponse({ status: 201, description: 'Експонат успішно створенний' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        description: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Request() req: any,
  ) {
    const user = { id: req.user.userId, username: req.user.username };
    if (!user) {
      throw new Error('Користувач не знайдений');
    }

    const imagePath = `uploads/${file.filename}`;
    return this.exhibitService.create(description, imagePath, user);
  }

  @Get()
  @ApiOperation({ summary: 'Отримання всіх укспонатів' })
  @ApiResponse({ status: 200, description: 'Список експонатів' })
  async findAll() {
    return this.exhibitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримання експонатів по ID' })
  @ApiResponse({ status: 200, description: 'Експонат знайдено' })
  async findOne(@Param('id') id: number) {
    return this.exhibitService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалення експоната' })
  @ApiResponse({ status: 200, description: 'Експонат видаленно' })
  async remove(@Param('id') id: number) {
    await this.exhibitService.remove(id);
    return { message: 'Експонат успішно видалений' };
  }
}
