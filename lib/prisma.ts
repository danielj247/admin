import { PrismaClient } from "@prisma/client";

type Global = typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = (global as Global).prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") (global as Global).prisma = prisma;

export default prisma;
