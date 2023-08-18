import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categories.controller.js";
import { validateCreateRequestBody, validateUpdateRequestBody } from "./../middlewares/validators/categories.validator.js"
import { validateUser } from "../middlewares/auth/user.auth.js";

const categoriesRouter = Router();
categoriesRouter.get("/", getCategory)
categoriesRouter.post("/", validateUser, validateCreateRequestBody, createCategory)
categoriesRouter.delete("/", validateUser, deleteCategory)
categoriesRouter.patch("/", validateUser, validateUpdateRequestBody, updateCategory)

export default categoriesRouter;