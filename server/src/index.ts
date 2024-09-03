import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";
const { expressjwt } = require("express-jwt");

const app = express();
const PORT = 3000;

// Configurar CORS para permitir acesso do frontend
app.use(cors({ origin: true }));

app.use(express.json());

app.use(
  expressjwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/", "/user/register", "/user/login"],
  })
);

// Registrar todas as rotas
app.get("/", (req: Request, res: Response) => {
  res.send("api-feed! 🐱‍🐉");
});

app.use("/", router);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server rodando em localhost:${PORT} 🐱‍🐉`);
});
