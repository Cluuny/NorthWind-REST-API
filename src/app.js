import path from 'path';
import cors from "cors";
import express from "express";
import { fileURLToPath } from 'url';
import apiRouter from "./routes/api.route.js";
import mainRouter from "./routes/main.route.js";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerSpec } from "./middlewares/docs/swagger.docs.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json());
app.use('/assets', express.static(__dirname + "/assets"));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.use("/", mainRouter);
app.use("/api", apiRouter);
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec, { customSiteTitle: "Northwind API", customfavIcon: "/assets/bank.ico" }))
app.use((req, res) => {
    res.status(404).json({ error: `Error, ${req.url} not found` })
})

export default app