import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controllers/orders.controller.js";
import { validateCreateRequestbody } from "../middlewares/validators/orders.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders)
ordersRouter.post("/", validateUser, validateCreateRequestbody, createOrder)
ordersRouter.delete("/", validateUser, deleteOrder)

export default ordersRouter;