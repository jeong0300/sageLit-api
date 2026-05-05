import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { type Auth } from 'firebase-admin/auth';
import { type Env } from '../../config/env';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private app?: admin.app.App;

  constructor(private readonly config: ConfigService<Env, true>) {}

  onModuleInit(): void {
    if (admin.apps.length > 0) {
      this.app = admin.apps[0]!;
      return;
    }

    const projectId = this.config.get('FIREBASE_PROJECT_ID', { infer: true });
    const clientEmail = this.config.get('FIREBASE_CLIENT_EMAIL', {
      infer: true,
    });
    const privateKey = this.config
      .get('FIREBASE_PRIVATE_KEY', { infer: true })
      .replace(/\\n/g, '\n');

    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  auth(): Auth {
    if (!this.app) {
      throw new Error('Firebase Admin not initialized');
    }
    return this.app.auth();
  }
}
