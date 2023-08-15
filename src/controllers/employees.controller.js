import { PrismaClient } from "@prisma/client";
import { decryptMany, encryptMany } from "../utils/cryptoData.js";
const prisma = new PrismaClient();
export const getEmployees = async (req, res) => {
    try {
        let getEmployeesQuery;
        let decryptEmployeesQuery;
        if (Object.keys(req.query).length === 0) {
            getEmployeesQuery = await prisma.employees.findMany();
            decryptEmployeesQuery = decryptMany(getEmployeesQuery);
        } else {
            const { id } = req.query;
            getEmployeesQuery = await prisma.employees.findUnique({
                where: {
                    EmployeeID: parseInt(id)
                }
            })
            decryptEmployeesQuery = decryptMany([getEmployeesQuery]);
        }
        res.status(200).json(decryptEmployeesQuery);
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }
}
export const createEmployee = async (req, res) => {
    try {
        const { LastName, FirstName, Photo, Notes } = req.body
        let { BirthDate } = req.body
        BirthDate = new Date(BirthDate).toISOString()
        const encryptEmployeeData = encryptMany([{
            LastName,
            FirstName,
            BirthDate,
            Photo,
            Notes
        }])
        const createEmployeeQuery = await prisma.employees.create({
            data: encryptEmployeeData[0]
        })
        res.status(201).json({
            EmployeeID: createEmployeeQuery.EmployeeID
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
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.query
        await prisma.employees.delete({
            where: { EmployeeID: parseInt(id) }
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
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.query
        const { LastName, FirstName, Photo, Notes } = req.body
        let { BirthDate } = req.body
        BirthDate = new Date(BirthDate).toISOString()
        const encryptEmployeeData = encryptMany([{
            LastName,
            FirstName,
            BirthDate,
            Photo,
            Notes
        }])
        await prisma.employees.update({
            where: { EmployeeID: parseInt(id) },
            data: encryptEmployeeData[0]
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