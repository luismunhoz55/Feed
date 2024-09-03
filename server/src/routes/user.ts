import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcryptjs";
import z from "zod";
import { registerSchema } from "../lib/schemas";

export async function userRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient();

  app.post("/user/register", async (request, reply) => {
    const { name, email, password } = registerSchema.parse(request.body);

    // verify if the email already exist in database
    const verifyExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (verifyExistingUser)
      return reply.code(401).send({ message: "Email already registered" });

    // Encrypt the password
    const hashedPassword = await hash(password, 8);

    // Create the user and save in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  });

  // Login user route
  app.post("/user/login", async (request, reply) => {
    const userRegisterSchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    // Use zod to verify if the data is correct
    const { email, password } = userRegisterSchema.parse(request.body);

    // Find the user in the database and compare the data in the request
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return reply.code(401).send("Incorrect email or password");

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      return reply.code(401).send("Incorrect email or password");

    // If everything is correct, return a JWT token
    const token = app.jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      // {
      //   expiresIn: "30 days",
      // }
    );

    return { token };
  });

  // User data route
  app.get("/user/data", async (request, reply) => {
    await request.jwtVerify();

    const userId = request.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return {
      name: user?.name,
      email: user?.email,
    };
  });
}
