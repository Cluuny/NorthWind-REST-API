import { PrismaClient } from "@prisma/client";
import { decryptMany } from "../utils/decrypt.js";
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
        res.status(500).json({
            message: "Error",
            error: error.message
        })
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
        res.status(200).json(createSupplierQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.query
        const deleteSupplierQuery = await prisma.suppliers.delete({
            where: {
                SupplierID: parseInt(id)
            }
        })
        res.status(200).json(deleteSupplierQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.query
        const { SupplierName, ContactName, Address, City, PostalCode, Country } = req.body
        const updateSupplierQuery = await prisma.suppliers.update({
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
        res.status(200).json(updateSupplierQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
