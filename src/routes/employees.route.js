import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employees.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/employees.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";


const employeesRouter = Router();
employeesRouter.get("/", getEmployees)
employeesRouter.post("/", validateUser, validateCreateRequestbody, createEmployee)
employeesRouter.delete("/", validateUser, deleteEmployee)
employeesRouter.patch("/", validateUser, validateUpdateRequestbody, updateEmployee)

export default employeesRouter;