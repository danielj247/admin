import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { RoleEnum, User } from "@prisma/client";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // @ts-expect-error -> want to return a User or Error instead of NextAuth's expectation
      async authorize(credentials): Promise<User | Error> {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Missing username or password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user?.role === RoleEnum.USER) {
          throw new Error("Only admins can login");
        }

        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return user;
      },
    }),
  ],
};

export function auth(
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}

export async function guard() {
  "use server";
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
}
