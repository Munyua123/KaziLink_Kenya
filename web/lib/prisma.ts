import { PrismaClient } from '@/app/generated/prisma'
import 'dotenv/config'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined')

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn', 'info']
      : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
