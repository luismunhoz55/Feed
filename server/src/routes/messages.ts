import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

export async function messagesRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient();

  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/messages", async (request, reply) => {
    const messages = await prisma.messages.findMany({
      where: {
        isPrivate: false,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return messages;
  });

  app.get("/mymessages", async (request, reply) => {
    const userId = request.user.id;

    const messages = await prisma.messages.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return messages;
  });

  app.post("/messages", async (request, reply) => {
    const createMessageBody = z.object({
      title: z.string(),
      message: z.string(),
      isPrivate: z.boolean(),
    });

    const { title, message, isPrivate } = createMessageBody.parse(request.body);

    const userNameRequest = await prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
      select: {
        name: true,
      },
    });

    const userName = userNameRequest?.name ?? "Default";

    const createdMessage = await prisma.messages.create({
      data: {
        title,
        message,
        userId: request.user.id,
        isPrivate,
        userName,
      },
    });

    return createdMessage ?? "Error";
  });
}
