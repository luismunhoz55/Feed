import { Request, Response } from "express";
import { createMessageSchema, deleteMessageSchema } from "../lib/schemas";
import { AppError } from "../lib/error";
import { ZodError } from "zod";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getUserMessages,
} from "../services/messagesService";

export async function getAllMessagesHandler(req: Request, res: Response) {
  const messages = await getAllMessages();

  res.status(200).json(messages);
}

export async function createMessageHandler(req: Request, res: Response) {
  try {
    const { title, message, isPrivate } = createMessageSchema.parse(req.body);

    const createdMessage = await createMessage({
      title,
      message,
      isPrivate,
      userId: req.user.id,
    });

    if (!message) {
      throw new AppError(400, "ERROR", "Não foi possível criar a mensagem");
    }

    res.status(200).json(createdMessage);
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

export async function getMyMessagesHandler(req: Request, res: Response) {
  const messages = await getUserMessages(req.user.id);

  return res.status(200).json(messages);
}

export async function deleteMessageHandler(req: Request, res: Response) {
  try {
    const { id } = deleteMessageSchema.parse(req.params);

    const result = await deleteMessage(id);

    if (!result) {
      throw new AppError(400, "ERROR", "Não foi possível apagar a mensagem");
    }

    return res.status(200).json({ message: "Ok" });
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
