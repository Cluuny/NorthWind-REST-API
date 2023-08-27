import { Router } from "express";
import { getSuppliers, createSupplier, deleteSupplier, updateSupplier } from "../controllers/suppliers.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody, validateQueryParam } from "../middlewares/validators/supplier.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const suppliersRouter = Router();

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     tags:
 *       - Suppliers
 *     summary: This endpoint returns all the suppliers in the database or an especific suppliers if his id is provided as a query parameter.
 *     description: Returns all the suppliers in the database or an especific suppliers if his id is provided as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         type: string
 *         required: false
 *         description: The id of the supplier to return
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
 *                   SupplierID:
 *                     type: integer
 *                   SupplierName:
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
suppliersRouter.get("/", getSuppliers)

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     tags:
 *       - Suppliers
 *     summary: This endpoint creates a new supplier in the database.
 *     description: Creates a new supplier in the database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: SupplierName
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             SupplierName:
 *               type: string
 *         description: The name of the supplier
 *       - in: body
 *         name: ContactName
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ContactName:
 *               type: string
 *         description: The contact name of the supplier
 *       - in: body
 *         name: Address
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Address:
 *               type: string
 *         description: The address of the supplier
 *       - in: body
 *         name: City
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             City:
 *               type: string
 *         description: The city of the supplier
 *       - in: body
 *         name: PostalCode
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             PostalCode:
 *               type: string
 *         description: The postal code of the supplier
 *       - in: body
 *         name: Country
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Country:
 *               type: string
 *         description: Country of the supplier
 *       - in: body
 *         name: Phone
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Phone:
 *               type: string
 *         description: The phone number of the supplier
 *     responses:
 *       201:
 *         description: ID of the new registerd Supplier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SupplierID: 
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
suppliersRouter.post("/", validateUser, validateCreateRequestbody, createSupplier)

/**
 * @swagger
 * /api/suppliers:
 *   delete:
 *     tags:
 *       - Suppliers
 *     summary: This endpoint deletes a supplier in the database.
 *     description: Deletes a supplier in the database.
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
 *         description: The id of the supplier to delete
 *     responses:
 *       204:
 *         description: The Supplier was succesfull deleted
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
suppliersRouter.delete("/", validateUser, validateQueryParam, deleteSupplier)

/**
 * @swagger
 * /api/suppliers:
 *   patch:
 *     tags:
 *       - Suppliers
 *     summary: This endpoint updates a supplier in the database.
 *     description: Updates a supplier in the database.
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
 *         description: The id of the supplier to delete
 *       - in: body
 *         name: SupplierName
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             SupplierName:
 *               type: string
 *         description: The name of the supplier
 *       - in: body
 *         name: ContactName
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             ContactName:
 *               type: string
 *         description: The contact name of the supplier
 *       - in: body
 *         name: Address
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             Address:
 *               type: string
 *         description: The address of the supplier
 *       - in: body
 *         name: City
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             City:
 *               type: string
 *         description: The city of the supplier
 *       - in: body
 *         name: PostalCode
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             PostalCode:
 *               type: string
 *         description: The postal code of the supplier
 *       - in: body
 *         name: Country
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             Country:
 *               type: string
 *         description: Country of the supplier
 *       - in: body
 *         name: Phone
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             Phone:
 *               type: string
 *         description: The phone number of the supplier
 *     responses:
 *       204:
 *         description: The supplier was succesfull updated
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
 */
suppliersRouter.patch("/", validateUser, validateQueryParam, validateUpdateRequestbody, updateSupplier)

export default suppliersRouter;