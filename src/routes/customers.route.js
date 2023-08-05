import { Router } from "express"
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";

const customersRouter = Router();
customersRouter.get("/", getCustomers)
// customersRouter.post("/", createCustomer)
// customersRouter.delete("/", deleteCustomer)
// customersRouter.patch("/", updateCustomer)

export default customersRouter