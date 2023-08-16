import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../utils/validators/products.validator.js";

const productsRouter = Router()
productsRouter.get("/", getProducts)
productsRouter.post("/", validateCreateRequestbody, createProduct)
productsRouter.delete("/", deleteProduct)
productsRouter.patch("/", validateUpdateRequestbody, updateProduct)

export default productsRouter