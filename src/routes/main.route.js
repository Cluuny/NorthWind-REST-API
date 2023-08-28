import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.render("pages/index");
})

export default mainRouter;