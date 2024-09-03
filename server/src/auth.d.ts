import { userJWT } from "./lib/interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}
