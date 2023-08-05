import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getShippers = async (req, res) => {
    try {
        let getShippersQuery
        if (Object.keys(req.query).length === 0) {
            getShippersQuery = await prisma.shippers.findMany()
        } else {
            const { id } = req.query
            getShippersQuery = await prisma.shippers.findUnique({
                where: {
                    ShipperID: parseInt(id)
                }
            })
        }
        res.status(200).json(getShippersQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
export const createShipper = async (req, res) => {
    try {
        const { ShipperName, Phone } = req.body
        const createShipperQuery = await prisma.shippers.create({
            data: {
                ShipperName,
                Phone
            }
        })
        res.status(200).json(createShipperQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
export const deleteShipper = async (req, res) => {
    try {
        const { id } = req.query
        const deleteShipperQuery = await prisma.shippers.delete({
            where: {
                ShipperID: parseInt(id)
            }
        })
        res.status(200).json(deleteShipperQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
export const updateShipper = async (req, res) => {
    try {
        const { id } = req.query
        const { ShipperName, Phone } = req.body
        const updateShipperQuery = await prisma.shippers.update({
            where: {
                ShipperID: parseInt(id)
            },
            data: {
                ShipperName,
                Phone
            }
        })
        res.status(200).json(updateShipperQuery)
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
