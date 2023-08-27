import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody, validateQueryParam } from "../middlewares/validators/products.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";

const productsRouter = Router()

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: This endpoint returns all the products in the database or an especific products if his id is provided as a query parameter.
 *     description: Returns all the products in the database or an especific products if his id is provided as a query parameter.
 *     responses:
 *       200:
 *         description: The returned Product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   ProdcutID:
 *                     type: integer
 *                   ProductName:
 *                     type: string
 *                   SupplierID:
 *                     type: integer
 *                   CategoryID:
 *                     type: integer
 *                   Unit:
 *                     type: string
 *                   Price:
 *                     type: integer
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
productsRouter.get("/", getProducts)

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: This endpoint creates a new product in the database.
 *     description: Creates a new product in the database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: ProductName
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ProductName:
 *               type: string
 *         description: The product name
 *       - in: body
 *         name: SupplierID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             SupplierID:
 *               type: integer
 *         description: The supplier id  
 *       - in: body
 *         name: CategoryID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             CategoryID:
 *               type: integer
 *         description: The category id
 *       - in: body
 *         name: Unit
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Unit:
 *               type: string
 *         description: The unit
 *       - in: body
 *         name: Price
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Price:
 *               type: integer
 *         description: The price
 *     responses:
 *       201:
 *         description: ID of the new Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CustomerID: 
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
 * 
 */
productsRouter.post("/", validateUser, validateCreateRequestbody, createProduct)

/**
 * @swagger
 * /api/products:
 *   delete:
 *     tags:
 *       - Products
 *     summary: This endpoint deletes a product in the database.
 *     description: Deletes a product in the database.
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
 *         description: The product id
 *     responses:
 *       204:
 *         description: The Product was succesfull deleted
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
 *     
 */
productsRouter.delete("/", validateUser, validateQueryParam, deleteProduct)

/**
 * @swagger
 * /api/products:
 *   patch:
 *     tags:
 *       - Products
 *     summary: This endpoint updates a product in the database.
 *     description: Updates a product in the database.
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
 *         description: The product id
 *       - in: body
 *         name: ProductName
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             ProductName:
 *               type: string
 *         description: The product name
 *       - in: body
 *         name: SupplierID
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             SupplierID:
 *               type: integer
 *         description: The supplier id  
 *       - in: body
 *         name: CategoryID
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             CategoryID:
 *               type: integer
 *         description: The category id
 *       - in: body
 *         name: Unit
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             Unit:
 *               type: string
 *         description: The unit
 *       - in: body
 *         name: Price
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             Price:
 *               type: integer
 *         description: The price
 *     responses:
 *       204:
 *         description: The product was succesfull updated
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
productsRouter.patch("/", validateUser, validateQueryParam, validateUpdateRequestbody, updateProduct)

export default productsRouter