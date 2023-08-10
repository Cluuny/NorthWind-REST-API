import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
const productsRouter = Router()

productsRouter.get("/", getProducts)
productsRouter.post("/", createProduct)
productsRouter.delete("/", deleteProduct)
productsRouter.patch("/", updateProduct)

export default productsRouter