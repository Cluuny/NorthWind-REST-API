import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categories.controller.js";
import { validateCreateRequestBody, validateUpdateRequestBody } from "./../utils/validators/categories.validator.js"

const categoriesRouter = Router();
categoriesRouter.get("/", getCategory)
categoriesRouter.post("/", validateCreateRequestBody, createCategory)
categoriesRouter.delete("/", deleteCategory)
categoriesRouter.patch("/", validateUpdateRequestBody, updateCategory)

export default categoriesRouter;