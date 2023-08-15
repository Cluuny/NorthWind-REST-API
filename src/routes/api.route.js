import { Router } from "express";
import categoriesRouter from "./categories.route.js";
import customersRouter from "./customers.route.js";
import employeesRouter from "./employees.route.js";
import ordersRouter from "./orders.route.js";
import productsRouter from "./products.router.js";
import shippersRouter from "./shippers.router.js";
import suppliersRouter from "./suppliers.route.js";

const apiRouter = Router();
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
    res.status(404).json({
        error: `This endpoint only accepts GET request`,
        errorDetails: `${req.baseUrl} -> ${req.method} not found`
    })
})

export default apiRouter;
