import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import { hash, compare } from "bcryptjs";

export async function userRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient();

  app.post("/user/register", async (request, reply) => {
    const userRegisterSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { name, email, password } = userRegisterSchema.parse(request.body);

    const verifyExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (verifyExistingUser)
      return reply.code(401).send("Email already registered");

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return reply.code(201).send("Success!");
  });

  app.post("/user/login", async (request, reply) => {
    const userRegisterSchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = userRegisterSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return reply.code(401).send("E-mail ou senha incorretos");

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      return reply.code(401).send("E-mail ou senha incorretos");

    return reply.code(200).send("Você está logado!");
  });
}
