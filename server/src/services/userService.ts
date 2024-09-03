import { PrismaClient } from "@prisma/client";
import { Message, User, userJWT } from "../lib/interfaces";

const prisma = new PrismaClient();

export async function getUserById(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user == null) return null;

  return {
    name: user.name,
    email: user.email,
    password: null,
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user == null) return null;

  return {
    name: user.name,
    email: user.email,
    password: user.password,
  };
}

export async function getUserJWT(email: string): Promise<userJWT | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user == null) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}
