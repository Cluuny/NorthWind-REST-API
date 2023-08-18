import { check, matchedData, param, validationResult } from "express-validator";

export const validateGetRequestParam = [
    param('Category')
        .exists()
        .isString()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('We need the name of the Category!'),
    (req, res, next) => {
        const errors = validationResult(req)
        const hasErrors = !errors.isEmpty()
        if (hasErrors) {
            return res.status(400).json({
                message: "Bad request",
                errors: errors.array()
            })
        }
        req.params = matchedData(req)
        return next()
    }
]

export const validateCreateRequestBody = [
    check('CategoryName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('A Category must have a name.'),
    check('Description')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('A Category must have a description.'),
    (req, res, next) => {
        const errors = validationResult(req)
        const hasErrors = !errors.isEmpty()
        if (hasErrors) {
            return res.status(400).json({
                message: "Bad request",
                errors: errors.array()
            })
        }
        req.body = matchedData(req)
        return next()
    }
]

export const validateDeleteRequestBody = [
    (req, res, next) => {
        const errors = validationResult(req)
        const hasErrors = !errors.isEmpty()
        if (hasErrors) {
            return res.status(400).json({
                message: "Bad request",
                errors: errors.array()
            })
        }
        req.body = matchedData(req)
        return next()
    }
]

export const validateUpdateRequestBody = [
    [
        check('CategoryName')
            .optional()
            .isString()
            .trim()
            .notEmpty()
            .escape()
            .withMessage('A Category must have a value'),
        check('Description')
            .optional()
            .isString()
            .trim()
            .notEmpty()
            .escape()
            .withMessage('A Category must have a value'),
        check('RootPassword')
            .optional()
            .isString()
            .trim()
            .escape()
            .notEmpty(),
    ],
    (req, res, next) => {
        const result = validationResult(req)
        const hasErrors = !result.isEmpty()
        const errors = result.errors
        req.body = matchedData(req)
        if (hasErrors) {
            return res.status(400).json({
                message: "Bad request",
                errors: errors
            })
        }
        return next()
    },
]
