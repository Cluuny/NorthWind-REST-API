import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getShippers = async (req, res) => {
    try {
        let getShippersQuery
        if (Object.keys(req.query).length === 0) {
            getShippersQuery = await prisma.shippers.findMany()
        } else {
            const { id } = req.query
            getShippersQuery = await prisma.shippers.findUniqueOrThrow({
                where: {
                    ShipperID: parseInt(id)
                }
            })
        }
        res.status(200).json(getShippersQuery)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    res.status(404).json({ message: `Theres no Shippers with the provided ID`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
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
        res.status(201).json({
            ShipperID: createShipperQuery.ShipperID
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    res.status(404).json({ message: `Already exists a Shipper with the provided data`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const deleteShipper = async (req, res) => {
    try {
        const { id } = req.query
        await prisma.shippers.delete({
            where: {
                ShipperID: parseInt(id)
            }
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
export const updateShipper = async (req, res) => {
    try {
        const { id } = req.query
        const { ShipperName, Phone } = req.body
        await prisma.shippers.update({
            where: {
                ShipperID: parseInt(id)
            },
            data: {
                ShipperName,
                Phone
            }
        })
        res.sendStatus(204)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    res.status(404).json({ message: `Theres no Shippers with the provided ID`, error: error.name })
                    break;
                default:
                    res.status(500).json({ message: "Internal Server Error", error: error.message })
            }
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
