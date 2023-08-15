import { PrismaClient, Prisma } from "@prisma/client";
import { decryptMany, encryptMany } from "../utils/cryptoData.js";
const prisma = new PrismaClient();
export const getCategory = async (req, res) => {
    try {
        let categoriesQuery
        let decryptedCategoriesQuery
        if (Object.keys(req.query).length === 0) {
            categoriesQuery = await prisma.categories.findMany();
            decryptedCategoriesQuery = decryptMany(categoriesQuery);
        }
        else {
            const { id } = req.query;
            categoriesQuery = await prisma.categories.findUnique({
                where: { CategoryID: parseInt(id) }
            })
            decryptedCategoriesQuery = decryptMany([categoriesQuery]);
        }
        res.status(200).json(decryptedCategoriesQuery);
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
};
export const createCategory = async (req, res) => {
    try {
        const { CategoryName, Description } = req.body;
        const encryptedData = encryptMany([{
            CategoryName,
            Description
        }]);
        const createCategoryQuery = await prisma.categories.create({
            data: encryptedData[0]
        })
        res.status(201).json({
            CategoryID: createCategoryQuery.CategoryID
        })
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else if (error.name.toString() === 'PrismaClientUnknownRequestError') {
            res.status(403).json({ message: "This API only provides GET Enpoints, if you have any questions, please contact support at: vistrent834@gmail.com", error: "User Unauthorized" })
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
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else if (error.name.toString() === 'PrismaClientUnknownRequestError') {
            res.status(403).json({ message: "This API only provides GET Enpoints, if you have any questions, please contact support at: vistrent834@gmail.com", error: "User Unauthorized" })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }

};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.query;
        const { CategoryName, Description } = req.body;
        const encryptedData = encryptMany([{
            CategoryName,
            Description
        }]);
        await prisma.categories.update({
            where: { CategoryID: parseInt(id) },
            data: encryptedData[0]
        })
        res.sendStatus(204)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else if (error.name.toString() === 'PrismaClientUnknownRequestError') {
            res.status(403).json({ message: "This API only provides GET Enpoints, if you have any questions, please contact support at: vistrent834@gmail.com", error: "User Unauthorized" })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
};
