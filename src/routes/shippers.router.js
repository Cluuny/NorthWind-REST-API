import { Router } from "express";
import { getShippers, createShipper, deleteShipper, updateShipper } from "../controllers/shippers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody, validateQueryParam } from "../middlewares/validators/shipers.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const shippersRouter = Router();

/**
 * @swagger
 * /api/shippers:
 *   get:
 *     tags:
 *       - Shippers
 *     summary: This endpoint returns all the shippers in the database or an especific shippers if his id is provided as a query parameter.
 *     description: Returns all the shippers in the database or an especific shippers if his id is provided as a query parameter.
 *     responses:
 *       200:
 *         description: The returned shipper
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   ShipperID:
 *                     type: integer
 *                   ShipperName:
 *                     type: string
 *                   Phone:
 *                     type: string
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 *       5xx:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 */
shippersRouter.get("/", getShippers)

/**
 * @swagger
 * /api/shippers:
 *   post:
 *     tags:
 *       - Shippers
 *     summary: This endpoint creates a new shipper in the database.
 *     description: Creates a new shipper in the database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: ShipperName
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ShipperName:
 *               type: string
 *         description: The name of the shipper
 *       - in: body
 *         name: Phone
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Phone:
 *               type: string
 *         description: The phone number of the shipper
 *     responses:
 *       201:
 *         description: ID of the new registerd Shipper
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ShipperID: 
 *                   type: integer
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 *       401:
 *         description: User Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error: 
 *                   type: string
 *       5xx:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 */
shippersRouter.post("/", validateUser, validateCreateRequestbody, createShipper)

/**
 * @swagger
 * /api/shippers:
 *   delete:
 *     tags:
 *       - Shippers
 *     summary: This endpoint deletes a shipper in the database.
 *     description: Deletes a shipper in the database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: query
 *         name: id
 *         required: true
 *         type: string
 *         description: The id of the shipper to delete
 *     responses:
 *       204:
 *         description: The Shipper was succesfull deleted
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 *       401:
 *         description: User Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error: 
 *                   type: string
 *       5xx:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string  
 */
shippersRouter.delete("/", validateUser, validateQueryParam, deleteShipper)

/**
 * @swagger
 * /api/shippers:
 *   patch:
 *     tags:
 *       - Shippers
 *     summary: This endpoint updates a shipper in the database.
 *     description: Updates a shipper in the database.
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       required: true
 *       type: string
 *       description: API KEY provided for the owner to modify the data
 *     - in: query
 *       name: id
 *       required: true
 *       type: string
 *       description: The id of the shipper to update
 *     - in: body
 *       name: ShipperName
 *       required: false
 *       schema:
 *         type: object
 *         properties:
 *           ShipperName:
 *             type: string
 *       description: The name of the shipper
 *     - in: body
 *       name: Phone
 *       required: false
 *       schema:
 *         type: object
 *         properties:
 *           Phone:
 *             type: string
 *       description: The phone number of the shipper
 *     responses:
 *       204:
 *         description: The shipper was succesfull updated
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 *       401:
 *         description: User Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error: 
 *                   type: string
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 *       5xx:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 error: 
 *                   type: string
 * 
 */
shippersRouter.patch("/", validateUser, validateQueryParam, validateUpdateRequestbody, updateShipper)

export default shippersRouter