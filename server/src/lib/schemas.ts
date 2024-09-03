import { z } from "zod";

export const createMessageSchema = z.object({
  title: z.string({
    invalid_type_error: "O titulo deve ser uma string",
    required_error: "Por favor, insira o título",
  }),
  message: z.string({
    invalid_type_error: "A mensagem deve ser uma string",
    required_error: "Por favor, insira a mensagem",
  }),
  isPrivate: z.boolean({
    invalid_type_error: "isPrivate deve ser um boolean",
    required_error: "Por favor, diga se a mensagem deve ser privada",
  }),
});

export const registerSchema = z.object({
  name: z.string({
    invalid_type_error: "O nome deve ser uma string",
    required_error: "Por favor, insira o nome",
  }),
  email: z.string({
    invalid_type_error: "O email titulo deve ser uma string",
    required_error: "Por favor, insira o email",
  }),
  password: z.string({
    invalid_type_error: "A senha deve ser uma string",
    required_error: "Por favor, insira a senha",
  }),
});

export const loginSchema = z.object({
  email: z.string({
    invalid_type_error: "O email deve ser uma string",
    required_error: "Por favor, insira o email",
  }),
  password: z.string({
    invalid_type_error: "A senha deve ser uma string",
    required_error: "Por favor, insira a senha",
  }),
});

export const deleteMessageSchema = z.object({
  id: z.string({
    invalid_type_error: "A id deve ser uma string",
    required_error: "Por favor, insira a ID",
  }),
});
