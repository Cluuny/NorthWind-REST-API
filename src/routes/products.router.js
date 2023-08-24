import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody, validateQueryParam } from "../middlewares/validators/products.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const productsRouter = Router()
productsRouter.get("/", getProducts)
productsRouter.post("/", validateUser, validateCreateRequestbody, createProduct)
productsRouter.delete("/", validateUser, validateQueryParam, deleteProduct)
productsRouter.patch("/", validateUser, validateQueryParam, validateUpdateRequestbody, updateProduct)

export default productsRouter