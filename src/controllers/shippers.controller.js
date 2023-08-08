import { PrismaClient } from "@prisma/client";
import { decryptMany, encryptMany } from "../utils/cryptoData.js";
const prisma = new PrismaClient();
export const getShippers = async (req, res) => {
    try {
        let getShippersQuery
        let decryptedShippersQuery
        if (Object.keys(req.query).length === 0) {
            getShippersQuery = await prisma.shippers.findMany()
            decryptedShippersQuery = decryptMany(getShippersQuery)
        } else {
            const { id } = req.query
            getShippersQuery = await prisma.shippers.findUnique({
                where: {
                    ShipperID: parseInt(id)
                }
            })
            decryptedShippersQuery = decryptMany([getShippersQuery])
        }
        res.status(200).json(decryptedShippersQuery)
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const createShipper = async (req, res) => {
    try {
        const { ShipperName, Phone } = req.body
        const encryptedShipperData = encryptMany([{
            ShipperName,
            Phone
        }])
        const createShipperQuery = await prisma.shippers.create({
            data: encryptedShipperData[0]
        })
        res.json({
            ShipperID: createShipperQuery.ShipperID
        })
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
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
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const updateShipper = async (req, res) => {
    try {
        const { id } = req.query
        const { ShipperName, Phone } = req.body
        const encryptedShipperData = encryptMany([{
            ShipperName,
            Phone
        }])
        await prisma.shippers.update({
            where: {
                ShipperID: parseInt(id)
            },
            data: encryptedShipperData[0]
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
