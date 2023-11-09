import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { userRoutes } from "./routes/user";
import { messagesRoutes } from "./routes/messages";

const app = fastify();

// Register JWT Authorization
app.register(jwt, {
  secret: `${process.env.SECRET_KEY}`,
});

// Register CORS, so frontend can access backend routes
app.register(cors, {
  origin: true,
});

// Register all routes
app.register(userRoutes);
app.register(messagesRoutes);

// Configure fastify
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server rodando em localhost:3333 🐱‍🐉");
  });
