import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Користувач успішно зареєстрований',
  })
  @ApiResponse({ status: 400, description: 'Некоректні дані' })
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.register(username, password);
  }
}
