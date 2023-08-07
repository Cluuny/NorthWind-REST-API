import { PrismaClient } from "@prisma/client";
import { decryptMany } from "../utils/decrypt.js";
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
        res.status(500).json({ message: "Error", error: error.message })
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
        return res.send({
            message: "Employee created",
            employee: createEmployeeQuery
        })
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.query
        const deleteEmployeeQuery = await prisma.employees.delete({
            where: { EmployeeID: parseInt(id) }
        })
        res.status(200).json({
            message: "Employee deleted",
            employee: deleteEmployeeQuery
        })
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.query
        const { LastName, FirstName, BirthDate, Photo, Notes } = req.body
        const updateEmployeeQuery = await prisma.employees.update({
            where: { EmployeeID: parseInt(id) },
            data: {
                LastName,
                FirstName,
                BirthDate,
                Photo,
                Notes
            }
        })
        res.status(200).json({
            message: "Employee updated",
            employee: updateEmployeeQuery
        })
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}