import fastify from "fastify";
import cors from "@fastify/cors";
import { messagesRoutes } from "./routes";

const app = fastify();

app.register(cors, {
  origin: true, // todas as URLs de frontend poderão acessar nossas rotas backend
});
app.register(messagesRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server rodando em localhost:3333 🐱‍🐉");
  });
