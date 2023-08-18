import { Router } from "express"
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/customers.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const customersRouter = Router();
customersRouter.get("/", getCustomers)
customersRouter.post("/", validateUser, validateCreateRequestbody, createCustomer)
customersRouter.delete("/", validateUser, deleteCustomer)
customersRouter.patch("/", validateUser, validateUpdateRequestbody, updateCustomer)

export default customersRouter