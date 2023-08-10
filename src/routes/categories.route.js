import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categories.controller.js";

const categoriesRouter = Router();
categoriesRouter.get("/", getCategory)
categoriesRouter.post("/", createCategory)
categoriesRouter.delete("/", deleteCategory)
categoriesRouter.patch("/", updateCategory)

export default categoriesRouter;