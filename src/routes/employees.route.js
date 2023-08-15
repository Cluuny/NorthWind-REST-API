import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employees.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../utils/validators/employees.validator.js";

const employeesRouter = Router();
employeesRouter.get("/", getEmployees)
employeesRouter.post("/", validateCreateRequestbody, createEmployee)
employeesRouter.delete("/", deleteEmployee)
employeesRouter.patch("/", validateUpdateRequestbody, updateEmployee)

export default employeesRouter;