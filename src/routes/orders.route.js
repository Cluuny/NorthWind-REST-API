import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controllers/orders.controller.js";
import { validateCreateRequestbody } from "../utils/validators/orders.validator.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders)
ordersRouter.post("/", validateCreateRequestbody, createOrder)
ordersRouter.delete("/", deleteOrder)

export default ordersRouter;