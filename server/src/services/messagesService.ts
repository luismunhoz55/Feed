import { PrismaClient } from "@prisma/client";
import { Message } from "../lib/interfaces";
import { getUserById } from "./userService";
import { AppError } from "../lib/error";

const prisma = new PrismaClient();

export async function createMessage(data: {
  title: string;
  message: string;
  isPrivate: boolean;
  userId: string;
}): Promise<Message> {
  const user = await getUserById(data.userId);

  if (!user) {
    throw new AppError(400, "NOT_FOUND", "Usuário não encontrado");
  }

  const userName = user.name;

  return await prisma.messages.create({
    data: {
      title: data.title,
      message: data.message,
      userId: data.userId,
      isPrivate: data.isPrivate,
      userName,
    },
  });
}

export async function getAllMessages(): Promise<Array<Message>> {
  return await prisma.messages.findMany({
    where: {
      isPrivate: false,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function getUserMessages(userId: string): Promise<Array<Message>> {
  return await prisma.messages.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function deleteMessage(messageId: string): Promise<Message> {
  return await prisma.messages.delete({
    where: {
      id: messageId,
    },
  });
}
