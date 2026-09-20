import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && !envUrl.startsWith('file:')) {
    return envUrl;
  }

  // On Vercel / serverless environment, copy dev.db to /tmp so SQLite can open and write journal files
  const tmpDbPath = '/tmp/dev.db';
  const possiblePaths = [
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.join(process.cwd(), 'dev.db'),
  ];

  let foundSrcPath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      foundSrcPath = p;
      break;
    }
  }

  if (foundSrcPath) {
    try {
      const srcStat = fs.statSync(foundSrcPath);
      const shouldCopy = !fs.existsSync(tmpDbPath) || fs.statSync(tmpDbPath).size !== srcStat.size;
      if (shouldCopy) {
        fs.copyFileSync(foundSrcPath, tmpDbPath);
      }
      return `file:${tmpDbPath}`;
    } catch (err) {
      console.error('Error copying SQLite DB to /tmp:', err);
      return `file:${foundSrcPath}`;
    }
  }

  return envUrl || 'file:./dev.db';
}

const dbUrl = getDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
