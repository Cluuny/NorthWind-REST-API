import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categories.controller.js";
import { validateCreateRequestBody, validateUpdateRequestBody } from "./../utils/validators/categories.validator.js"
import { encryptRequest } from "../utils/data.crypto.js";

const categoriesRouter = Router();
categoriesRouter.get("/", getCategory)
categoriesRouter.post("/", validateCreateRequestBody, encryptRequest, createCategory)
categoriesRouter.delete("/", deleteCategory)
categoriesRouter.patch("/", validateUpdateRequestBody, updateCategory)

export default categoriesRouter;