import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employees.controller.js";

const employeesRouter = Router();
employeesRouter.get("/", getEmployees)
employeesRouter.post("/", createEmployee)
employeesRouter.delete("/", deleteEmployee)
employeesRouter.patch("/", updateEmployee)

export default employeesRouter;