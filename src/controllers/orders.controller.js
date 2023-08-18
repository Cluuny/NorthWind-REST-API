import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getOrders = async (req, res) => {
    try {
        const { id } = req.query
        const OrdersQuery = await prisma.orders.findMany({
            where: { OrderID: parseInt(id) },
            select: {
                OrderID: true,
                CustomerID: true,
                EmployeeID: true,
                OrderDate: true,
                orderdetails: {
                    select: {
                        ProductID: true,
                        Unit: true,
                    }
                }
            }
        })
        res.status(200).json(OrdersQuery)
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
        const { CustomerID, EmployeeID, ShipperID, OrderDate, Products } = req.body
        const createOrderQuery = await prisma.orders.create({
            data: {
                CustomerID: parseInt(CustomerID),
                EmployeeID: parseInt(EmployeeID),
                ShipperID: parseInt(ShipperID),
                OrderDate: OrderDate,
            }
        })
        for (const product of Products) {
            await prisma.orderdetails.create({
                data: {
                    OrderID: createOrderQuery.OrderID,
                    ProductID: parseInt(product.ProductID),
                    Unit: parseInt(product.Unit)
                }
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
        const { id } = req.query
        await prisma.orderdetails.deleteMany({
            where: {
                OrderID: parseInt(id)
            }
        })
        await prisma.orders.delete({
            where: {
                OrderID: parseInt(id)
            }
        })
        return res.sendStatus(204)
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
