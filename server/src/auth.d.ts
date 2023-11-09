import "@fastify/jwt";

// Standardizing the data sent to the token
declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
