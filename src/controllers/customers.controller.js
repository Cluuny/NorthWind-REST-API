import { PrismaClient } from "@prisma/client"
import { decryptMany, encryptMany } from "../utils/cryptoData.js"
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
            getCustomersQuery = await prisma.customers.findUnique({
                where: { CustomerID: parseInt(id) }
            })
            decryptCustomersQuery = decryptMany([getCustomersQuery])
        }
        res.status(200).json(decryptCustomersQuery)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }

}
export const createCustomer = async (req, res) => {
    try {
        const { CustomerName, ContactName, CustomerPassword, Address, City, PostalCode, Country } = req.body
        const encryptCustomerData = encryptMany([{
            CustomerName,
            ContactName,
            CustomerPassword,
            Address,
            City,
            PostalCode,
            Country
        }])
        const createCustomerQuery = await prisma.customers.create({
            data: encryptCustomerData[0]
        })
        res.json({
            CustomerID: createCustomerQuery.CustomerID
        })
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.query
        await prisma.customers.delete({
            where: { CustomerID: parseInt(id) }
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
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.query
        const { CustomerName, ContactName, CustomerPassword, Address, City, PostalCode, Country } = req.body
        const encryptCustomerData = encryptMany([{
            CustomerName,
            ContactName,
            CustomerPassword,
            Address,
            City,
            PostalCode,
            Country
        }])
        await prisma.customers.update({
            where: { CustomerID: parseInt(id) },
            data: encryptCustomerData[0]
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
