import { Router } from "express";
import {
  createMessageHandler,
  deleteMessageHandler,
  getAllMessagesHandler,
  getMyMessagesHandler,
} from "../controllers/messagesController";
import { middlewareJWT } from "../lib/jwtMiddleware";
import {
  loginHandler,
  registerHandler,
  userDataHandler,
} from "../controllers/userController";

const router = Router();

router.post("/user/register", registerHandler);
router.post("/user/login", loginHandler);
router.get("/user/data", middlewareJWT, userDataHandler);
router.get("/messages", middlewareJWT, getAllMessagesHandler);
router.post("/messages", middlewareJWT, createMessageHandler);
router.get("/mymessages", middlewareJWT, getMyMessagesHandler);
router.delete("/messages/:id", middlewareJWT, deleteMessageHandler);

export default router;
