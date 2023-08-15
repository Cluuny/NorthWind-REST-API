import { body, validationResult, matchedData } from 'express-validator'

export const validateCreateRequestbody = [
    body('CustomerName')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('CustomerName is required'),
    body('ContactName')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('ContactName is required'),
    body('CustomerPassword')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('CustomerPassword is required'),
    body('Address')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Address is required'),
    body('City')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('City is required'),
    body('PostalCode')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('PostalCode is required'),
    body('Country')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('PostalCode is required'),
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
    body('CustomerName')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('CustomerName is required'),
    body('ContactName')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('ContactName is required'),
    body('CustomerPassword')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('CustomerPassword is required'),
    body('Address')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Address is required'),
    body('City')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('City is required'),
    body('PostalCode')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('PostalCode is required'),
    body('Country')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('PostalCode is required'),
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