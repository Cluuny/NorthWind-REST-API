import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getEmployees = async (req, res) => {
    try {
        let getEmployeesQuery;
        if (Object.keys(req.query).length === 0) {
            getEmployeesQuery = await prisma.employees.findMany();
        } else {
            const { id } = req.query;
            getEmployeesQuery = await prisma.employees.findUnique({
                where: {
                    EmployeeID: parseInt(id)
                }
            })
        }
        res.status(200).json(getEmployeesQuery);
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
        const { LastName, FirstName, BirthDate, Photo, Notes } = req.body
        const createEmployeeQuery = await prisma.employees.create({
            data: {
                LastName,
                FirstName,
                BirthDate,
                Photo,
                Notes
            }
        })
        res.status(201).json({
            EmployeeID: createEmployeeQuery.EmployeeID
        })
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).json({ message: "Not Found", error: error.message })
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
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.query
        const { LastName, FirstName, BirthDate, Photo, Notes } = req.body
        await prisma.employees.update({
            where: { EmployeeID: parseInt(id) },
            data: {
                LastName,
                FirstName,
                BirthDate,
                Photo,
                Notes
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