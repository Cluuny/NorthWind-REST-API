import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// for (const order of OrdersQuery[0]) {
//     order.orderDetails = []
//     const orderDetailsQuery = await poolDB.query('SELECT OrderDetailID, ProductID, Quantity FROM orderdetails WHERE OrderID = ? ', [order.OrderID])
//     for (const orderDetail of orderDetailsQuery[0]) {
//         order.orderDetails.push(orderDetail)
//     }
// }
export const getOrders = async (req, res) => {
    try {
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
        res.status(200).json(OrdersQuery)
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}
export const createOrder = async (req, res) => {
    try {
        const { CustomerID, EmployeeID, OrderDate, ShipperID, Products } = req.body
        const createOrderQuery = await prisma.orders.create({
            data: {
                CustomerID: parseInt(CustomerID),
                EmployeeID: parseInt(EmployeeID),
                OrderDate: OrderDate,
                ShipperID: parseInt(ShipperID)
            }
        })
        // if (resultQuery[0].affectedRows > 0) {
        //     for (const product of Products) {
        //         let resultQuery2 = await poolDB.query('INSERT INTO orderdetails (OrderID, ProductID, Quantity) VALUES (?, ?, ?)', [resultQuery[0].insertId, product.ProductID, product.Quantity])
        //         if (resultQuery2[0].affectedRows === 0) return new Error("Order details not created")
        //     }
        // }
        res.status(200).json({
            message: "Order created",
            order: createOrderQuery
        })
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}
export const deleteOrder = async (req, res) => {
    try {
        if (req.body.hasOwnProperty('ArrOrderDetails')) {
            let orderDetailQuery
            const { OrderID, ArrOrderDetails } = req.body
            for (const OrderDetail of ArrOrderDetails) {
                orderDetailQuery = await prisma.orderdetails.delete({
                    where: {
                        OrderID: parseInt(OrderID),
                        ProductID: parseInt(OrderDetail.ProductID)
                    }
                })
            }
            res.status(200).json({
                message: "Order details deleted"
            })
        } else {
            let orderQuery
            const { OrderID } = req.body
            orderDetailQuery = await prisma.orderdetails.deleteMany({
                where: {
                    OrderID: parseInt(OrderID)
                }
            })
            orderQuery = await prisma.orders.delete({
                where: {
                    OrderID: parseInt(OrderID)
                }
            })
            res.status(200).json({
                message: "Order deleted"
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}
