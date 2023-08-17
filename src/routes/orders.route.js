import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controllers/orders.controller.js";
import { validateCreateRequestbody } from "../utils/validators/orders.validator.js";
import { encryptRequest } from "../utils/data.crypto.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders)
ordersRouter.post("/", validateCreateRequestbody, encryptRequest, createOrder)
ordersRouter.delete("/", deleteOrder)

export default ordersRouter;