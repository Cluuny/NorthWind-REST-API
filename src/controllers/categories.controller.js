import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCategory = async (req, res) => {
    try {
        let getCategoryQuery
        if (Object.keys(req.query).length === 0) {
            getCategoryQuery = await prisma.categories.findMany()
        } else {
            const { id } = req.query
            getCategoryQuery = await prisma.categories.findUniqueOrThrow({
                where: { CategoryID: parseInt(id) }
            })
        }
        res.status(200).json(getCategoryQuery)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    res.status(404).json({ message: `Theres no Category with the provided ID`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
};
export const createCategory = async (req, res) => {
    try {
        const { CategoryName, Description } = req.body;
        const createCategoryQuery = await prisma.categories.create({
            data: {
                CategoryName,
                Description
            }
        })
        res.status(201).json({
            CategoryID: createCategoryQuery.CategoryID
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    res.status(404).json({ message: `Already exists a Category with the provided data`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.query;
        await prisma.categories.delete({
            where: { CategoryID: parseInt(id) }
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.query;
        const { CategoryName, Description } = req.body;
        await prisma.categories.update({
            where: { CategoryID: parseInt(id) },
            data: {
                CategoryName,
                Description
            }
        })
        res.sendStatus(204)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    res.status(404).json({ message: `Theres no Category with the provided ID`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
};
