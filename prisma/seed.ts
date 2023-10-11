import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const pw = process.env.ADMIN_PASSWORD;

  if (name && email && pw) {
    const password = await hash(pw, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "ADMIN",
      },
    });

    console.log(`Admin user created with email: ${email} and password: ${password}`);
  }

  console.log("npx prisma studio");
  console.log("to open Prisma Studio and view your data");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
