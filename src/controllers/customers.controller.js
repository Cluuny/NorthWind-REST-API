import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const getCustomers = async (req, res) => {
    try {
        let getCustomersQuery
        if (Object.keys(req.query).length === 0) {
            getCustomersQuery = await prisma.customers.findMany()
        } else {
            const { id } = req.query
            getCustomersQuery = await prisma.customers.findUnique({
                where: { CustomerID: parseInt(id) }
            })
        }
        res.status(200).json(getCustomersQuery)
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
        const { CustomerName, ContactName, Address, City, PostalCode, Country } = req.body
        const createCustomerQuery = await prisma.customers.create({
            data: {
                CustomerName,
                ContactName,
                Address,
                City,
                PostalCode,
                Country
            }
        })
        res.status(201).json({
            CustomerID: createCustomerQuery.CustomerID
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
        } else if (error.name.toString() === 'PrismaClientUnknownRequestError') {
            res.status(403).json({ message: "This API only provides GET Enpoints, if you have any questions, please contact support at: vistrent834@gmail.com", error: "User Unauthorized" })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.query
        const { CustomerName, ContactName, Address, City, PostalCode, Country } = req.body
        await prisma.customers.update({
            where: { CustomerID: parseInt(id) },
            data: {
                CustomerName,
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
        } else if (error.name.toString() === 'PrismaClientUnknownRequestError') {
            res.status(403).json({ message: "This API only provides GET Enpoints, if you have any questions, please contact support at: vistrent834@gmail.com", error: "User Unauthorized" })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
