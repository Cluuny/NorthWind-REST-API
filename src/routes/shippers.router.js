import { Router } from "express";
import { getShippers, createShipper, deleteShipper, updateShipper } from "../controllers/shippers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody, validateQueryParam } from "../middlewares/validators/shipers.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const shippersRouter = Router();

shippersRouter.get("/", getShippers)
shippersRouter.post("/", validateUser, validateCreateRequestbody, createShipper)
shippersRouter.delete("/", validateUser, validateQueryParam, deleteShipper)
shippersRouter.patch("/", validateUser, validateQueryParam, validateUpdateRequestbody, updateShipper)

export default shippersRouter