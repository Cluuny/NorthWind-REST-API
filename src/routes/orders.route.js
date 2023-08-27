import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controllers/orders.controller.js";
import { validateCreateRequestbody, validateQueryParam } from "../middlewares/validators/orders.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const ordersRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: This endpoint returns an specific order with the OrderID provided in the query parameter.
 *     description: Returns an specific order with the query parameter provided with a valid id
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         type: string
 *         description: The order id
 *     responses:
 *       200:
 *         description: The returned order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   OrderID: 
 *                     type: integer
 *                   CustomerID: 
 *                     type: integer
 *                   EmployeeID: 
 *                     type: integer
 *                   OrderDate: 
 *                     type: string
 *                   orderdetails:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ProductID:
 *                           type: integer
 *                         Quantity:
 *                           type: integer
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
ordersRouter.get("/", validateQueryParam, getOrders)

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: This endpoint creates a new order.
 *     description: Creates a new order in the Northwind database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: CustomerID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             CustomerID:
 *               type: integer
 *         description: The customer id
 *       - in: body
 *         name: EmployeeID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             EmployeeID:
 *               type: integer
 *         description: The employee id
 *       - in: body
 *         name: OrderDate
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             OrderDate:
 *               type: string
 *         description: The order date
 *       - in: body
 *         name: ShipperID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ShipperID:
 *               type: integer
 *         description: The shipper id
 *       - in: body
 *         name: Products
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ProductID:
 *                 type: integer
 *               Quantity:
 *                 type: integer  
 *     responses:
 *       201:
 *         description: ID of the new Order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OrderID: 
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
ordersRouter.post("/", validateUser, validateCreateRequestbody, createOrder)

/**
 * @swagger
 * /api/orders:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: This endpoint deletes an order.
 *     description: Deletes an Order with the ID in the Northwind database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the order to delete
 *     responses:
 *       204:
 *         description: The order was succesfull deleted
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
ordersRouter.delete("/", validateUser, validateQueryParam, deleteOrder)

export default ordersRouter;