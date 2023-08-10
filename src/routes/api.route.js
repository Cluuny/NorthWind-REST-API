import { Router } from "express";
import categoriesRouter from "./categories.route.js";
import customersRouter from "./customers.route.js";
import employeesRouter from "./employees.route.js";
import ordersRouter from "./orders.route.js";
import productsRouter from "./products.router.js";
import shippersRouter from "./shippers.router.js";
import suppliersRouter from "./suppliers.route.js";

const apiRouter = Router();
apiRouter.use("/", (req, res, next) => {
    if (req.url === "/") {
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
    }
    next();
})
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/customers", customersRouter);
apiRouter.use("/employees", employeesRouter)
apiRouter.use("/orders", ordersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/shippers", shippersRouter)
apiRouter.use("/suppliers", suppliersRouter)
apiRouter.use((req, res) => {
    res.status(404).json({ error: `Error, ${req.url} not found` })
})

export default apiRouter;
