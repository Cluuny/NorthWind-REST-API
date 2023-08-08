import { PrismaClient } from "@prisma/client";
import { decryptMany, encryptMany } from "../utils/cryptoData.js";
const prisma = new PrismaClient();

export const getSuppliers = async (req, res) => {
    try {
        let getSuppliersQuery
        let decryptedSuppliersQuery
        if (Object.keys(req.query).length === 0) {
            getSuppliersQuery = await prisma.suppliers.findMany()
            decryptedSuppliersQuery = decryptMany(getSuppliersQuery)
        } else {
            const { id } = req.query
            getSuppliersQuery = await prisma.suppliers.findUnique({
                where: {
                    SupplierID: parseInt(id)
                }
            })
            decryptedSuppliersQuery = decryptMany([getSuppliersQuery])
        }
        res.status(200).json(decryptedSuppliersQuery)
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
        const encryptedSupplierData = encryptMany([{
            SupplierName,
            ContactName,
            Address,
            City,
            PostalCode,
            Country
        }])
        const createSupplierQuery = await prisma.suppliers.create({
            data: encryptedSupplierData[0]
        })
        res.json({
            SupplierID: createSupplierQuery.SupplierID
        })
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
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
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.query
        const { SupplierName, ContactName, Address, City, PostalCode, Country } = req.body
        const encryptedSupplierData = encryptMany([{
            SupplierName,
            ContactName,
            Address,
            City,
            PostalCode,
            Country
        }])
        await prisma.suppliers.update({
            where: {
                SupplierID: parseInt(id)
            },
            data: encryptedSupplierData[0]
        })
        res.json({
            updated: true
        })
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
