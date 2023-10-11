import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json();

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json({ error: "Missing name, email, password, or confirmPassword" }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Password and confirm password do not match" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hash(password, 10),
    },
  });

  return NextResponse.json(user);
}
