import { Router } from "express"
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../utils/validators/customers.validator.js";

const customersRouter = Router();
customersRouter.get("/", getCustomers)
customersRouter.post("/", validateCreateRequestbody, createCustomer)
customersRouter.delete("/", deleteCustomer)
customersRouter.patch("/", validateUpdateRequestbody, updateCustomer)

export default customersRouter