import { body, validationResult, matchedData } from "express-validator";

export const validateCreateRequestbody = [
    body('ProductName')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('ProductName is required'),
    body('SupplierID')
        .exists()
        .isNumeric()
        .notEmpty()
        .withMessage('SupplierID is required'),
    body('CategoryID')
        .exists()
        .isNumeric()
        .notEmpty()
        .withMessage('CategoryID is required'),
    body('Unit')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Unit is required'),
    body('Price')
        .exists()
        .isNumeric()
        .notEmpty()
        .withMessage('Price is required'),
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
        next()
    }
]
export const validateUpdateRequestbody = [
    body('ProductName')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('ProductName is required'),
    body('SupplierID')
        .optional()
        .isNumeric()
        .notEmpty()
        .withMessage('SupplierID is required'),
    body('CategoryID')
        .optional()
        .isNumeric()
        .notEmpty()
        .withMessage('CategoryID is required'),
    body('Unit')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Unit is required'),
    body('Price')
        .optional()
        .isNumeric()
        .notEmpty()
        .withMessage('Price is required'),
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
        next()
    }
]