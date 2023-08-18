import { check, validationResult, matchedData } from "express-validator";

export const validateCreateRequestbody = [
    check('ProductName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ProductName is required'),
    check('SupplierID')
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage('SupplierID is required'),
    check('CategoryID')
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage('CategoryID is required'),
    check('Unit')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Unit is required'),
    check('Price')
        .exists()
        .notEmpty()
        .isNumeric()
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
    check('ProductName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ProductName is required'),
    check('SupplierID')
        .optional()
        .isNumeric()
        .notEmpty()
        .withMessage('SupplierID is required'),
    check('CategoryID')
        .optional()
        .isNumeric()
        .notEmpty()
        .withMessage('CategoryID is required'),
    check('Unit')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Unit is required'),
    check('Price')
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