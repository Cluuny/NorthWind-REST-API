import { Router } from "express";
import { getShippers } from "../controllers/shippers.controller.js";

const shippersRouter = Router();

shippersRouter.get("/", getShippers)
shippersRouter.post("/")
shippersRouter.delete("/")
shippersRouter.patch("/")

export default shippersRouter