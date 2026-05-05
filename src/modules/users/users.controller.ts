import { Body, Controller, Get, Patch } from '@nestjs/common';
import { type User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: User): User {
    return user;
  }

  @Patch('me')
  update(
    @CurrentUser() user: User,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(user.id, dto);
  }
}
