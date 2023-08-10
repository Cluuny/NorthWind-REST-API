import { Router } from "express";
import { getSuppliers } from "../controllers/suppliers.controller.js";

const suppliersRouter = Router();

suppliersRouter.get("/", getSuppliers)
suppliersRouter.post("/")
suppliersRouter.delete("/")
suppliersRouter.patch("/")

export default suppliersRouter;