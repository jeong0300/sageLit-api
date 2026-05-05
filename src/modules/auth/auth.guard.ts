import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Request } from 'express';
import { type User } from '@prisma/client';
import { FirebaseAdminService } from './firebase-admin.service';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

type AuthedRequest = Request & { user?: User };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseAdmin: FirebaseAdminService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthedRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    let decoded;
    try {
      decoded = await this.firebaseAdmin.auth().verifyIdToken(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = await this.authService.syncUser(decoded);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const header = request.headers.authorization;
    if (!header) {
      return undefined;
    }
    const [scheme, token] = header.split(' ');
    return scheme === 'Bearer' && token ? token : undefined;
  }
}
