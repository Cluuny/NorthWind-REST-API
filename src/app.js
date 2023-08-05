import express from "express";
import categoriesRouter from "./routes/categories.route.js";
import customersRouter from "./routes/customers.route.js";
import employeesRouter from "./routes/employees.route.js";
import ordersRouter from "./routes/orders.route.js";
import productsRouter from "./routes/products.router.js";
import shippersRouter from "./routes/shippers.router.js";
import suppliersRouter from "./routes/suppliers.route.js";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/customers", customersRouter);
app.use("/employees", employeesRouter)
app.use("/orders", ordersRouter)
app.use("/products", productsRouter)
app.use("/shippers", shippersRouter)
app.use("/suppliers", suppliersRouter)
app.use((req, res) => {
    res.status(404).json({ error: `Error, ${req.url} not found` })
})

export default app