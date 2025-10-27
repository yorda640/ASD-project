import { Router } from "express";

import { protect } from "../middleware/auth";
import { getMe, login, register } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);

export default authRouter;
