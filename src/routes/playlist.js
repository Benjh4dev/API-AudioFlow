import { Router } from "express";
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import { uploadMiddleware } from "../middlewares/verifyUploadFile.js";

const router = Router()

export { router }