import { Router } from "express"
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/customers.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const customersRouter = Router();

/**
 * @swagger
 * /api/customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: This endpoint returns a List with all the customers registered in the Northwind database or an specific customers
 *     description: Returns the entire customers schema or an specific customer if in the query parameter is provided with a valid id
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         type: string
 *         description: The id of the specific Customer to get, if this parameter is not provided, the endpoint returns all the Customers
 *     responses:
 *       200:
 *         description: List of Customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CustomerID: 
 *                     type: integer
 *                   CustomerName: 
 *                     type: string
 *                   ContactName: 
 *                     type: string
 *                   Address: 
 *                     type: string
 *                   City:
 *                     type: string
 *                   PostalCode:
 *                     type: string
 *                   Country:
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
customersRouter.get("/", getCustomers)

/**
 * @swagger
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Allow the creation of a new customer
 *     description: This endpoint allows the creation of a new customer in the Northwind database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: CustomerName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the new Customer
 *       - in: body
 *         name: ContactName
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact name of the new Customer
 *       - in: body
 *         name: Address
 *         required: true
 *         schema:
 *           type: string
 *         description: The address of the new Customer
 *       - in: body
 *         name: City
 *         required: true
 *         schema:
 *           type: string
 *         description: The city of the new Customer
 *       - in: body
 *         name: PostalCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The postal code of the city of the new Customer
 *       - in: body
 *         name: Country
 *         required: true
 *         schema:
 *           type: string
 *         description: The country of the new Customer
 *     responses:
 *       201:
 *         description: ID of the new Customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CustomerID: 
 *                   type: integer
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
customersRouter.post("/", validateUser, validateCreateRequestbody, createCustomer)

/**
 * @swagger
 * /api/customers:
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Allow the deletion of an specific customer
 *     description: This endpoint allows the deletion of a customer in the Northwind database.
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
 *         description: The id of the customer to delete
 *     responses:
 *       204:
 *         description: The customer was succesfull deleted
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
customersRouter.delete("/", validateUser, deleteCustomer)

/**
 * @swagger
 * /api/customers:
 *   patch:
 *     tags:
 *       - Customers
 *     summary: Allow the update of an specific customer
 *     description: This endpoint allows the update of an specific customer in the Northwind database.
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
 *         description: The id of the customer to update
 *       - in: body
 *         name: CustomerName
 *         required: false
 *         schema:
 *           type: string
 *         description: The name of the new Customer
 *       - in: body
 *         name: ContactName
 *         required: false
 *         schema:
 *           type: string
 *         description: The contact name of the new Customer
 *       - in: body
 *         name: Address
 *         required: false
 *         schema:
 *           type: string
 *         description: The address of the new Customer
 *       - in: body
 *         name: City
 *         required: false
 *         schema:
 *           type: string
 *         description: The city of the new Customer
 *       - in: body
 *         name: PostalCode
 *         required: false
 *         schema:
 *           type: string
 *         description: The postal code of the city of the new Customer
 *       - in: body
 *         name: Country
 *         required: false
 *         schema:
 *           type: string
 *         description: The country of the new Customer
 *     responses:
 *       204:
 *         description: The customer was succesfull updated
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
 */
customersRouter.patch("/", validateUser, validateUpdateRequestbody, updateCustomer)

export default customersRouter