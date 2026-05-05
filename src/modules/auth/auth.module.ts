import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAdminService } from './firebase-admin.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  providers: [
    FirebaseAdminService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [FirebaseAdminService, AuthService],
})
export class AuthModule {}
