import { PrismaClient } from "@prisma/client";
import { decryptMany, encryptMany } from "../utils/data.crypto.js";
const prisma = new PrismaClient();
export const getProducts = async (req, res) => {
    try {
        let getProductsQuery
        let decryptedProductsQuery
        if (Object.keys(req.query).length === 0) {
            getProductsQuery = await prisma.products.findMany();
            decryptedProductsQuery = decryptMany(getProductsQuery)
        } else {
            const { id } = req.query
            getProductsQuery = await prisma.products.findUnique({
                where: {
                    ProductID: parseInt(id)
                }
            })
            decryptedProductsQuery = decryptMany([getProductsQuery])
        }
        res.status(200).json(decryptedProductsQuery)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const createProduct = async (req, res) => {
    try {
        const { ProductName, SupplierID, CategoryID, Unit, Price } = req.body
        const encryptedProductData = encryptMany([{
            ProductName,
            SupplierID,
            CategoryID,
            Unit,
            Price
        }])
        const createProductQuery = await prisma.products.create({
            data: encryptedProductData[0]
        })
        res.status(201).json({
            ProductID: createProductQuery.ProductID
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
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query
        await prisma.products.delete({
            where: {
                ProductID: parseInt(id)
            }
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
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        const { ProductName, SupplierID, CategoryID, Unit, Price } = req.body
        const encryptedProductData = encryptMany([{
            ProductName,
            SupplierID,
            CategoryID,
            Unit,
            Price
        }])
        await prisma.products.update({
            where: {
                ProductID: parseInt(id)
            },
            data: encryptedProductData[0]
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
}