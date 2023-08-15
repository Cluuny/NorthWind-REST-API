import { body, matchedData, validationResult } from "express-validator";

export const validateCreateRequestBody = [
    body('CategoryName')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('A Category must have a name.'),
    body('Description')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('A Category must have a description.'),
    (req, res, next) => {
        const result = validationResult(req)
        const hasErrors = !result.isEmpty()
        const errors = result.errors
        req.body = matchedData(req)
        if (hasErrors) {
            return res.status(403).json({
                message: "Bad request",
                errors: errors
            })
        }
        return next()
    }
]

export const validateUpdateRequestBody = [
    [
        body('CategoryName')
            .optional()
            .isString()
            .notEmpty()
            .escape()
            .trim()
            .withMessage('A Category must have a name.'),
        body('Description')
            .optional()
            .isString()
            .notEmpty()
            .escape()
            .trim()
            .withMessage('A Category must have a description.'),
    ],
    (req, res, next) => {
        const result = validationResult(req)
        const hasErrors = !result.isEmpty()
        const errors = result.errors
        req.body = matchedData(req)
        if (hasErrors) {
            return res.status(403).json({
                message: "Bad request",
                errors: errors
            })
        }
        return next()
    },

]
