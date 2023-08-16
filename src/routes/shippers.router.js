import { Router } from "express";
import { getShippers, createShipper, deleteShipper, updateShipper } from "../controllers/shippers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../utils/validators/shipers.validator.js";

const shippersRouter = Router();

shippersRouter.get("/", getShippers)
shippersRouter.post("/", validateCreateRequestbody, createShipper)
shippersRouter.delete("/", deleteShipper)
shippersRouter.patch("/", validateUpdateRequestbody, updateShipper)

export default shippersRouter