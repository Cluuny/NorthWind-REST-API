import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controllers/orders.controller.js";
import { validateCreateRequestbody, validateQueryParam } from "../middlewares/validators/orders.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const ordersRouter = Router();

ordersRouter.get("/", validateQueryParam, getOrders)
ordersRouter.post("/", validateUser, validateCreateRequestbody, createOrder)
ordersRouter.delete("/", validateUser, validateQueryParam, deleteOrder)

export default ordersRouter;