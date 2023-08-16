import { Router } from "express";
import { getSuppliers, createSupplier, deleteSupplier, updateSupplier } from "../controllers/suppliers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../utils/validators/supplier.validator.js";

const suppliersRouter = Router();

suppliersRouter.get("/", getSuppliers)
suppliersRouter.post("/", validateCreateRequestbody, createSupplier)
suppliersRouter.delete("/", deleteSupplier)
suppliersRouter.patch("/", validateUpdateRequestbody, updateSupplier)

export default suppliersRouter;