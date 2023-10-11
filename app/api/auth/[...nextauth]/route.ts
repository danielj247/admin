import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { RoleEnum, User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

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

        if (!user || !(await compare(password, user.password)) || user.role === RoleEnum.USER) {
          throw new Error("Invalid username or password");
        }

        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
