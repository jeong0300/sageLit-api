import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type User } from '@prisma/client';
import { type Request } from 'express';

type AuthedRequest = Request & { user?: User };

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<AuthedRequest>();
    if (!request.user) {
      throw new Error('CurrentUser used on a non-authenticated route');
    }
    return request.user;
  },
);
