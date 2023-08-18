import { Router } from "express";
import { getShippers, createShipper, deleteShipper, updateShipper } from "../controllers/shippers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/shipers.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const shippersRouter = Router();

shippersRouter.get("/", getShippers)
shippersRouter.post("/", validateUser, validateCreateRequestbody, createShipper)
shippersRouter.delete("/", validateUser, deleteShipper)
shippersRouter.patch("/", validateUser, validateUpdateRequestbody, updateShipper)

export default shippersRouter