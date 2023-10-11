"use server";

import { hash } from "bcrypt";
import { Prisma, RoleEnum } from "@prisma/client";
import prisma from "@/lib/prisma";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role?: RoleEnum;
}

export async function createUser(params: CreateUserParams) {
  const { name, email, password, role = RoleEnum.USER } = params;
  const passwordHash = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
      },
    });

    return user;
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new Error("User already exists");
        default:
          throw new Error("Error creating user");
      }
    }
  }
}
