import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCategory = async (req, res) => {
    try {
        let categoriesQuery
        if (Object.keys(req.query).length === 0) {
            categoriesQuery = await prisma.categories.findMany();
        }
        else {
            const { id } = req.query;
            categoriesQuery = await prisma.categories.findUnique({
                where: { CategoryID: parseInt(id) }
            })
        }
        res.status(200).json(categoriesQuery);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
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
        res.status(200).json({
            message: "Category created",
            category: createCategoryQuery
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.query;
        const deleteCategoryQuery = await prisma.categories.delete({
            where: { CategoryID: parseInt(id) }
        })
        res.status(200).json({
            message: "Category deleted",
            category: deleteCategoryQuery
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }

};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.query;
        const { CategoryName, Description } = req.body;
        const updateCategoryQuery = await prisma.categories.update({
            where: { CategoryID: parseInt(id) },
            data: {
                CategoryName,
                Description
            }
        })
        res.status(200).json({
            message: "Category updated",
            category: updateCategoryQuery
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
};
