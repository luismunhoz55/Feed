import { NextFunction, Request, Response } from "express";
import { AppError } from "./error";
import { userJWT } from "./interfaces";
import jwt from "jsonwebtoken";

export const middlewareJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenRaw = req.headers["authorization"];

  if (!tokenRaw) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Separar o "Bearer" do token
  const token = tokenRaw.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
    if (err || !decoded) {
      // Verifica se houve erro ou se decoded é undefined
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    // return res.status(200).json({ decoded });

    // Aqui, se o token for válido, você pode anexar os dados do usuário ao req
    req.user = decoded as userJWT;
    next();
  });
};
