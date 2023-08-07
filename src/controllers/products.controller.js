import { PrismaClient } from "@prisma/client";
import { decryptMany } from "../utils/decrypt.js";
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
        res.status(500).json({ message: "Error", error: error.message })
    }
}
export const createProduct = async (req, res) => {
    try {
        const { ProductName, SupplierID, CategoryID, Unit, Price } = req.body
        const createProductQuery = await prisma.products.create({
            data: {
                ProductName,
                SupplierID,
                CategoryID,
                Unit,
                Price
            }
        })
        res.status(200).json({
            message: "Product created",
            product: createProductQuery
        })
    } catch (error) {
        res.status(500).json({ alert: "Error", message: error.message })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query
        const deleteProductQuery = await prisma.products.delete({
            where: {
                ProductID: parseInt(id)
            }
        })
        res.send(200).json({
            message: "Product deleted",
            product: deleteProductQuery
        })
    } catch (error) {
        res.status(500).json({ alert: "Error", message: error.message })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        const { ProductName, SupplierID, CategoryID, Unit, Price } = req.body
        const updateProductQuery = await prisma.products.update({
            where: {
                ProductID: parseInt(id)
            },
            data: {
                ProductName,
                SupplierID,
                CategoryID,
                Unit,
                Price
            }
        })
        res.send(200).json({
            message: "Product updated",
            product: updateProductQuery
        })
    } catch (error) {
        res.status(500).send({
            alert: "Error",
            message: error.message
        })
    }

}