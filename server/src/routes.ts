import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

export async function messagesRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient();

  app.get("/messages", async (request, reply) => {
    const messages = await prisma.messages.findMany({
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
    });

    const { title, message } = createMessageBody.parse(request.body);

    const createdMessage = await prisma.messages.create({
      data: {
        title,
        message,
      },
    });

    return createdMessage ?? "Error";
  });
}
