import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getProducts = async (req, res) => {
    try {
        let getProductsQuery
        if (Object.keys(req.query).length === 0) {
            getProductsQuery = await prisma.products.findMany();
        } else {
            const { id } = req.query
            getProductsQuery = await prisma.products.findUniqueOrThrow({
                where: {
                    ProductID: parseInt(id)
                }
            })
        }
        res.status(200).json(getProductsQuery)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    res.status(404).json({ message: `Theres no Products with the provided ID`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
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
        res.status(201).json({
            ProductID: createProductQuery.ProductID
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    res.status(404).json({ message: `Already exists a Product with the provided data`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
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
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        const { ProductName, SupplierID, CategoryID, Unit, Price } = req.body
        await prisma.products.update({
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
        res.sendStatus(204)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    res.status(404).json({ message: `Theres no Products with the provided ID`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}