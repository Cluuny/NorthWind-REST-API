import { PrismaClient } from "@prisma/client"
import { decryptMany, encrypt } from "../utils/data.crypto.js"
const prisma = new PrismaClient()

export const getOrders = async (req, res) => {
    try {
        let decryptedOrdersQuery
        const { CustomerID } = req.body
        const OrdersQuery = await prisma.orders.findMany({
            where: { CustomerID: parseInt(CustomerID) },
            select: {
                OrderID: true,
                CustomerID: false,
                Employee: {
                    select: {
                        EmployeeID: true,
                    }
                },
                OrderDate: true,
                Shipper: {
                    select: {
                        ShipperID: true,
                    }
                },
                orderdetails: {
                    select: {
                        ProductID: true,
                        Quantity: true
                    }
                }
            },
        })
        decryptedOrdersQuery = decryptMany(OrdersQuery)
        res.status(200).json(decryptedOrdersQuery)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const createOrder = async (req, res) => {
    try {
        const { CustomerID, EmployeeID, ShipperID, Products } = req.body
        let { OrderDate } = req.body
        OrderDate = new Date(OrderDate).toISOString();
        const encryptedOrderData = encrypt([{
            CustomerID: parseInt(CustomerID),
            EmployeeID: parseInt(EmployeeID),
            OrderDate: OrderDate,
            ShipperID: parseInt(ShipperID)
        }])
        const createOrderQuery = await prisma.orders.create({
            data: encryptedOrderData[0]
        })
        for (const product of Products) {
            let encryptedOrderDetailsData = encrypt([{
                OrderID: parseInt(createOrderQuery.OrderID),
                ProductID: parseInt(product.ProductID),
                Quantity: product.Quantity.toString()
            }])
            await prisma.orderdetails.create({
                data: encryptedOrderDetailsData[0]
            })
        }
        res.status(201).json({
            OrderID: createOrderQuery.OrderID
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
export const deleteOrder = async (req, res) => {
    try {
        const { CustomerID, OrderID } = req.body
        let customerOrderQuery = await prisma.orders.findUnique({
            where: {
                OrderID: parseInt(OrderID)
            },
            select: {
                CustomerID: true
            }
        })
        if (customerOrderQuery.CustomerID !== parseInt(CustomerID)) {
            throw new Error("CustomerID does not match with OrderID")
        }
        if (req.body.hasOwnProperty('Products')) {
            const { Products } = req.body
            for (const product of Products) {
                await prisma.orderdetails.deleteMany({
                    where: {
                        OrderID: parseInt(OrderID),
                        ProductID: parseInt(product.ProductID)
                    }
                })
            }
            return res.sendStatus(204)
        } else {
            await prisma.orderdetails.deleteMany({
                where: {
                    OrderID: parseInt(OrderID)
                }
            })
            await prisma.orders.delete({
                where: {
                    OrderID: parseInt(OrderID)
                }
            })
            return res.sendStatus(204)
        }
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
