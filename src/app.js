import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.route.js";

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api", apiRouter);
app.use((req, res) => {
    res.status(404).json({ error: `Error, ${req.url} not found` })
})

export default app