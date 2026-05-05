import { Injectable, UnauthorizedException } from '@nestjs/common';
import { type DecodedIdToken } from 'firebase-admin/auth';
import { type User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(decoded: DecodedIdToken): Promise<User> {
    const email = decoded.email;
    if (!email) {
      throw new UnauthorizedException('Firebase token has no email claim');
    }

    return this.prisma.user.upsert({
      where: { firebaseUid: decoded.uid },
      update: {
        email,
        displayName: decoded.name ?? null,
      },
      create: {
        firebaseUid: decoded.uid,
        email,
        displayName: decoded.name ?? null,
      },
    });
  }
}
