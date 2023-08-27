import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSuppliers = async (req, res) => {
    try {
        let getSuppliersQuery
        if (Object.keys(req.query).length === 0) {
            getSuppliersQuery = await prisma.suppliers.findMany()
        } else {
            const { id } = req.query
            getSuppliersQuery = await prisma.suppliers.findUnique({
                where: {
                    SupplierID: parseInt(id)
                }
            })
        }
        res.status(200).json(getSuppliersQuery)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const createSupplier = async (req, res) => {
    try {
        const { SupplierName, ContactName, Address, City, PostalCode, Country } = req.body
        const createSupplierQuery = await prisma.suppliers.create({
            data: {
                SupplierName,
                ContactName,
                Address,
                City,
                PostalCode,
                Country
            }
        })
        res.status(201).json({
            SupplierID: createSupplierQuery.SupplierID
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.query
        await prisma.suppliers.delete({
            where: {
                SupplierID: parseInt(id)
            }
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.query
        const { SupplierName, ContactName, Address, City, PostalCode, Country } = req.body
        await prisma.suppliers.update({
            where: {
                SupplierID: parseInt(id)
            },
            data: {
                SupplierName,
                ContactName,
                Address,
                City,
                PostalCode,
                Country
            }
        })
        res.sendStatus(204)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
