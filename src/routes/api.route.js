import { Router } from "express";
import categoriesRouter from "./categories.route.js";
import customersRouter from "./customers.route.js";
import employeesRouter from "./employees.route.js";
import ordersRouter from "./orders.route.js";
import productsRouter from "./products.router.js";
import shippersRouter from "./shippers.router.js";
import suppliersRouter from "./suppliers.route.js";

const apiRouter = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - API
 *     summary: Main page of the API
 *     description: Welcome to the API, here you can find the endpoints of the API
 *     responses:
 *       200:
 *         description: Welcome to the API
 *         content:
 *           application/json:
 *             schema:
 *               type: object 
 *               properties: 
 *                 message:
 *                   type: string
 *                   example: Welcome to the API
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: string
 *                       example: /api/categories
 *                     customers:
 *                       type: string
 *                       example: /api/customers
 *                     employees:
 *                       type: string
 *                       example: /api/employees
 *                     orders:
 *                       type: string
 *                       example: /api/orders
 *                     products:
 *                       type: string
 *                       example: /api/products
 *                     shippers:
 *                       type: string
 *                       example: /api/shippers
 *                     suppliers:
 *                       type: string
 *                       example: /api/suppliers
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
 */
apiRouter.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to the API",
        endpoints: {
            categories: "/api/categories",
            customers: "/api/customers",
            employees: "/api/employees",
            orders: "/api/orders",
            products: "/api/products",
            shippers: "/api/shippers",
            suppliers: "/api/suppliers"
        }
    })
})

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/customers", customersRouter);
apiRouter.use("/employees", employeesRouter)
apiRouter.use("/orders", ordersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/shippers", shippersRouter)
apiRouter.use("/suppliers", suppliersRouter)

apiRouter.use((req, res) => {
    res.redirect("/api")
})

export default apiRouter;
