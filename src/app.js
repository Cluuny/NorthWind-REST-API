import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.route.js";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerSpec } from "./middlewares/docs/swagger.docs.js";

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api", apiRouter);
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec, { customSiteTitle: "Northwind API" }))
app.use((req, res) => {
    res.status(404).json({ error: `Error, ${req.url} not found` })
})

export default app