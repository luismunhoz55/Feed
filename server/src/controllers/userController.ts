import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../lib/schemas";
import { AppError } from "../lib/error";
import { ZodError } from "zod";
import { hash, compare } from "bcryptjs";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserJWT,
} from "../services/userService";
import jwt from "jsonwebtoken";

export async function registerHandler(req: Request, res: Response) {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const verifyExistingUser = await getUserByEmail(email);

    if (verifyExistingUser) {
      throw new AppError(
        400,
        "DUPLICATE_EMAIL",
        "Esse e-mail já está sendo usado"
      );
    }

    // Encrypt the password
    const hashedPassword = await hash(password, 8);

    await createUser({ name, email, password: hashedPassword });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: error.issues[0].message,
      });
    }

    if (error instanceof AppError) {
      return res.status(error.status_code).json({
        error_code: error.error_code,
        error_description: error.error_description,
      });
    }

    res.status(400).json({
      error_code: "ERROR",
      error_description: error,
    });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await getUserJWT(email);

    if (!user) {
      throw new AppError(409, "AUTH_ERROR", "E-mail ou senha incorretos");
    }

    const passwordMatched = await compare(password, user.password!);

    if (!passwordMatched) {
      throw new AppError(409, "AUTH_ERROR", "E-mail ou senha incorretos");
    }

    const newUser = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    jwt.sign(newUser, process.env.SECRET_KEY!, (err, token) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

        return;
      }

      return res.status(200).json({ token });
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: error.issues[0].message,
      });
    }

    if (error instanceof AppError) {
      return res.status(error.status_code).json({
        error_code: error.error_code,
        error_description: error.error_description,
      });
    }

    res.status(400).json({
      error_code: "ERROR",
      error_description: error,
    });
  }
}

export async function userDataHandler(req: Request, res: Response) {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      throw new AppError(409, "USER_NOT_FOUND", "Usuário não encontrado");
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status_code).json({
        error_code: error.error_code,
        error_description: error.error_description,
      });
    }

    res.status(400).json({
      error_code: "ERROR",
      error_description: error,
    });
  }
}
