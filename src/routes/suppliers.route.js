import { Router } from "express";
import { getSuppliers, createSupplier, deleteSupplier, updateSupplier } from "../controllers/suppliers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/supplier.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const suppliersRouter = Router();

suppliersRouter.get("/", getSuppliers)
suppliersRouter.post("/", validateUser, validateCreateRequestbody, createSupplier)
suppliersRouter.delete("/", validateUser, deleteSupplier)
suppliersRouter.patch("/", validateUser, validateUpdateRequestbody, updateSupplier)

export default suppliersRouter;