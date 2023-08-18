import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/products.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const productsRouter = Router()
productsRouter.get("/", getProducts)
productsRouter.post("/", validateUser, validateCreateRequestbody, createProduct)
productsRouter.delete("/", validateUser, deleteProduct)
productsRouter.patch("/", validateUser, validateUpdateRequestbody, updateProduct)

export default productsRouter