import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employees.controller.js";
import { validateCreateRequestbody, validateUpdateRequestbody } from "../middlewares/validators/employees.validator.js";
import { validateUser } from "../middlewares/auth/user.auth.js";


const employeesRouter = Router();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     summary: This endpoint returns a List with all the employees registered in the Northwind database or an specific employee
 *     description: Returns the entire employees schema or an specific employee if in the query parameter is provided with a valid id
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         type: string
 *         description: The id of the specific Employee to get, if this parameter is not provided, the endpoint returns all the employees
 *     responses:
 *       200:
 *         description: List of Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   EmployeeID: 
 *                     type: integer
 *                   LastName: 
 *                     type: string
 *                   FirstName: 
 *                     type: string
 *                   BirthDate: 
 *                     type: string
 *                   Photo:
 *                     type: string
 *                   Notes:
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
employeesRouter.get("/", getEmployees)

/**
 * @swagger
 * /api/employees:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Allow the creation of a new employee
 *     description: This endpoint allows the creation of a new employee in the Northwind database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: API KEY provided for the owner to modify the data
 *       - in: body
 *         name: LastName
 *         required: true
 *         schema:
 *           type: string
 *         description: The last name of the new Employee
 *       - in: body
 *         name: FirstName
 *         required: true
 *         schema:
 *           type: string
 *         description: The first name of the new Employee
 *       - in: body
 *         name: BirthDate
 *         required: true
 *         schema:
 *           type: string
 *         description: The birth date of the new Employee
 *       - in: body
 *         name: Photo
 *         required: true
 *         schema:
 *           type: string
 *         description: The link to a profile photo for the new Employee
 *       - in: body
 *         name: Notes
 *         required: true
 *         schema:
 *           type: string
 *         description: Some info about the new Employee
 *     responses:
 *       201:
 *         description: ID of the new Employee
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
employeesRouter.post("/", validateUser, validateCreateRequestbody, createEmployee)

/**
 * @swagger
 * /api/employees:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: Allow the deletion of an specific employee
 *     description: This endpoint allows the deletion of a employee in the Northwind database.
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
 *         description: The id of the employee to delete
 *     responses:
 *       204:
 *         description: The employee was succesfull deleted
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
employeesRouter.delete("/", validateUser, deleteEmployee)

/**
 * @swagger
 * /api/employees:
 *   patch:
 *     tags:
 *       - Employees
 *     summary: Allow the update of an specific employee
 *     description: This endpoint allows the update of an specific employee in the Northwind database.
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
 *         description: The id of the employee to update
 *       - in: body
 *         name: LastName
 *         required: false
 *         schema:
 *           type: string
 *         description: The last name of the new Employee
 *       - in: body
 *         name: FirstName
 *         required: false
 *         schema:
 *           type: string
 *         description: The first name of the new Employee
 *       - in: body
 *         name: BirthDate
 *         required: false
 *         schema:
 *           type: string
 *         description: The birth date of the new Employee
 *       - in: body
 *         name: Photo
 *         required: false
 *         schema:
 *           type: string
 *         description: The link to a profile photo for the new Employee
 *       - in: body
 *         name: Notes
 *         required: false
 *         schema:
 *           type: string
 *         description: Some info about the new Employee
 *     responses:
 *       204:
 *         description: The employee was succesfull updated
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
employeesRouter.patch("/", validateUser, validateUpdateRequestbody, updateEmployee)

export default employeesRouter;