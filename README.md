# sageLit-api

Backend API for SageLit — a public-domain classics English-learning app.

## Stack

- **Runtime**: Node.js 22 LTS
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7 (strict)
- **Database**: PostgreSQL 17
- **Cache**: Redis
- **Storage**: Cloudflare R2 (S3-compatible)
- **Auth**: Firebase Admin
- **Validation**: class-validator + class-transformer

## Folder layout

```
src/
├── main.ts              # entry point
├── app.module.ts        # root module
├── common/              # filters, guards, interceptors, pipes
├── config/              # env config + validation schema
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
# (set DATABASE_URL and REDIS_URL in .env)

# 4. Start dev server
npm run start:dev
```

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
