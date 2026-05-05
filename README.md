# sageLit-api

Backend API for SageLit — a public-domain classics English-learning app.

## Stack

- **Runtime**: Node.js 22 LTS
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7 (strict)
- **Database**: PostgreSQL 17
- **ORM**: Prisma 6.x
- **Cache**: Redis
- **Storage**: Cloudflare R2 (S3-compatible)
- **Auth**: Firebase Admin
- **Validation**: class-validator + class-transformer (DTOs); zod (env vars)

## Folder layout

```
prisma/
└── schema.prisma        # Prisma schema (User/Book/Passage/ProgressCard/Subscription/SelectedBook)
src/
├── main.ts              # entry point
├── app.module.ts        # root module — ConfigModule + ThrottlerModule + PrismaModule
├── common/              # filters, guards, interceptors, pipes
├── config/
│   └── env.ts           # zod env-var validation
├── prisma/
│   ├── prisma.service.ts  # PrismaClient lifecycle (connect/disconnect)
│   └── prisma.module.ts   # @Global module exporting PrismaService
└── modules/
    ├── auth/            # Firebase ID token verification
    ├── users/           # user profile, curation mode
    ├── content/         # books (Gutenberg ingest), passages
    ├── lessons/         # lesson sessions, grammar explanations
    ├── progress/        # spaced-repetition cards (SM-2)
    ├── payments/        # Stripe + Google Play Billing
    └── ai/              # image gen, TTS, LLM orchestration
```

Reference conventions averaged from: NestJS official, Toss/Woowabros open source.

## Getting started

```bash
# 1. Install dependencies (Node 22 LTS required)
npm install

# 2. Copy env template
cp .env.example .env

# 3. Run Postgres + Redis (local dev)
#    set DATABASE_URL and REDIS_URL in .env

# 4. Generate Prisma client + run initial migration
npm run prisma:generate
npm run prisma:migrate:dev -- --name init

# 5. Start dev server
npm run start:dev
```

### Prisma scripts

| Command | Purpose |
| --- | --- |
| `npm run prisma:generate` | Regenerate `@prisma/client` types after schema changes |
| `npm run prisma:migrate:dev` | Create + apply a new migration locally |
| `npm run prisma:migrate:deploy` | Apply migrations in production (no schema diff) |
| `npm run prisma:studio` | Launch Prisma Studio GUI |
| `npm run prisma:format` | Format `schema.prisma` |

## Security baseline

- Schema-based DTO validation (class-validator) on every endpoint
- Helmet HTTP headers, CORS allowlist, rate limiting (`@nestjs/throttler`)
- Secrets via `.env` only — never committed
- OWASP Top 10 verified on every PR (`security-audit` agent)

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run start:dev` | Watch mode dev server |
| `npm run build` | Production build |
| `npm run test` | Unit tests |
| `npm run lint` | ESLint with auto-fix |
| `npm run format` | Prettier |

## Notes

- Versions in `package.json` use `^` ranges; `package-lock.json` pins exact resolutions on `npm install`.
- Local Node version (`v20.20.1`) is EOL — upgrade to Node 22 LTS before working on this repo.
