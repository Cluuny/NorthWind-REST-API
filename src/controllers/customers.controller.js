import { PrismaClient } from "@prisma/client"
import { decryptMany } from "../utils/decrypt.js"
const prisma = new PrismaClient()
export const getCustomers = async (req, res) => {
    try {
        let getCustomersQuery
        let decryptCustomersQuery
        if (Object.keys(req.query).length === 0) {
            getCustomersQuery = await prisma.customers.findMany()
            decryptCustomersQuery = decryptMany(getCustomersQuery)
        } else {
            const { id } = req.query
            resultQuery = await prisma.customers.findUnique({
                where: { CustomerID: parseInt(id) }
            })
            decryptCustomersQuery = decryptMany([resultQuery])
        }
        res.status(200).json(decryptCustomersQuery)
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }

}
export const createCustomer = async (req, res) => {
    try {
        const { CustomerName, ContactName, CustomerPassword, Address, City, PostalCode, Country } = req.body
        let createCustomerQuery = await prisma.customers.create({
            data: {
                CustomerName,
                ContactName,
                CustomerPassword,
                Address,
                City,
                PostalCode,
                Country
            }
        })
        res.status(200).json({
            message: "Customer created",
            customer: createCustomerQuery
        })
    } catch (error) {
        res.status(500).json({ message: "Missing required data" })
    }
}
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.query
        const deleteCustomerQuery = await prisma.customers.delete({
            where: { CustomerID: parseInt(id) }
        })
        res.status(200).json({
            message: "Customer deleted",
            customer: deleteCustomerQuery
        })

    } catch (error) {
        res.status(500).json({ message: "Missing required data" })
    }
}
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.query
        const { CustomerName, ContactName, CustomerPassword, Address, City, PostalCode, Country } = req.body
        const updateCustomerQuery = await prisma.customers.update({
            where: { CustomerID: parseInt(id) },
            data: {
                CustomerName,
                ContactName,
                CustomerPassword,
                Address,
                City,
                PostalCode,
                Country
            }
        })
        res.status(200).json({
            message: "Customer updated",
            customer: updateCustomerQuery
        })
    } catch (error) {
        res.status(500).json({ message: "Missing required data" })
    }
}
