import * as express from "express";
import { UserController } from "./user.controller";
const userRouter = express.Router();
userRouter.get("/", UserController.findAll);
userRouter.get("/:userId", UserController.findById);
userRouter.post("/", UserController.save);
export { userRouter };
