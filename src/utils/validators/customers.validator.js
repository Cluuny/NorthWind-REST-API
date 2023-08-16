import { check, validationResult, matchedData } from 'express-validator'

export const validateCreateRequestbody = [
    check('CustomerName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('CustomerName is required'),
    check('ContactName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('ContactName is required'),
    check('CustomerPassword')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('CustomerPassword is required'),
    check('Address')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Address is required'),
    check('City')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('City is required'),
    check('PostalCode')
        .exists()
        .isPostalCode('any')
        .trim()
        .notEmpty()
        .withMessage('PostalCode is required'),
    check('Country')
        .exists()
        .isString()
        .trim()
        .notEmpty()
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
    check('CustomerName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('CustomerName must have a value'),
    check('ContactName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ContactName must have a value'),
    check('CustomerPassword')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('CustomerPassword must have a value'),
    check('Address')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Address must have a value'),
    check('City')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('City must have a value'),
    check('PostalCode')
        .optional()
        .isPostalCode()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('PostalCode must have a value'),
    check('Country')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('PostalCode must have a value'),
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