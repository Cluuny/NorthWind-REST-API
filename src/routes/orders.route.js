import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders)
// ordersRouter.post("/", createOrder)
// ordersRouter.delete("/", deleteOrder)

export default ordersRouter;