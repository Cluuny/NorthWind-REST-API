import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categories.controller.js";
import { validateCreateRequestBody, validateUpdateRequestBody, validateQueryParam } from "./../middlewares/validators/categories.validator.js"
import { validateUser } from "../middlewares/auth/user.auth.js";

const categoriesRouter = Router();
/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: This endpoint returns a List with all the categories registered in the Northwind database or an specific category
 *     description: Returns the entire categories schema or an specific category if in the query parameter is provided with a valid id
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         type: string
 *         description: The id of the specific Category to get, if this parameter is not provided, the endpoint returns all the categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CategoryID: 
 *                     type: integer
 *                   CategoryName: 
 *                     type: string
 *                   Description: 
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
categoriesRouter.get("/", getCategory)

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Allow the creation of a new category
 *     description: This endpoint allows the creation of a new category in the Northwind database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: CategoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the new Category
 *       - in: body
 *         name: Description
 *         required: true
 *         schema:
 *           type: string
 *         description: A Description for the new Category
 *     responses:
 *       201:
 *         description: ID of the new Category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CategoryID: 
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
categoriesRouter.post("/", validateUser, validateCreateRequestBody, createCategory)

/**
 * @swagger
 * /api/categories:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Allow the deletion of an specific category
 *     description: This endpoint allows the deletion of a category in the Northwind database.
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
 *         description: The id of the category to delete
 *     responses:
 *       204:
 *         description: The category was succesfull deleted
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
categoriesRouter.delete("/", validateUser, validateQueryParam, deleteCategory)

/**
 * @swagger
 * /api/categories:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Allow the update of an specific category
 *     description: This endpoint allows the update of an specific category in the Northwind database.
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
 *         description: The id of the category to update
 *       - in: body
 *         name: CategoryName
 *         required: false
 *         schema:
 *           type: string
 *         description: The new name of the category
 *       - in: body
 *         name: Description
 *         required: false
 *         schema:
 *           type: string
 *         description: The new description of the category
 *     responses:
 *       204:
 *         description: The category was succesfull updated
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
categoriesRouter.patch("/", validateUser, validateQueryParam, validateUpdateRequestBody, updateCategory)

export default categoriesRouter;