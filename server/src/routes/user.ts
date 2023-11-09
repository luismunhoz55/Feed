import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import { hash, compare } from "bcryptjs";

export async function userRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient();

  // Register user route
  app.post("/user/register", async (request, reply) => {
    const userRegisterSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    // Use zod to verify if the data is correct
    const { name, email, password } = userRegisterSchema.parse(request.body);

    // verify if the email already exist in database
    const verifyExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (verifyExistingUser)
      return reply.code(401).send("Email already registered");

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

    // Create the JWT token and return it
    const token = app.jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return token;
  });

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
      },
      {
        expiresIn: "30 days",
      }
    );

    console.log(token);

    return reply.code(200).send("You are logged in!");
  });
}
