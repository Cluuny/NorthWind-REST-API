import { body, query, validationResult, matchedData } from 'express-validator';

export const validateQueryParam = [
    query('id')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('An ID must be provided'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request",
                errors: errors.array()
            })
        }
        req.body = matchedData(req);
        next();
    }
]

export const validateCreateRequestbody = [
    body('SupplierName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('SupplierName is required'),
    body('ContactName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ContactName is required'),
    body('Address')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Address is required'),
    body('City')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('City is required'),
    body('PostalCode')
        .exists()
        .isPostalCode('any')
        .trim()
        .notEmpty()
        .escape()
        .withMessage('PostalCode is required'),
    body('Country')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Country is required'),
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
    body('SupplierName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('SupplierName is required'),
    body('ContactName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ContactName is required'),
    body('Address')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Address is required'),
    body('City')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('City is required'),
    body('PostalCode')
        .optional()
        .isPostalCode('any')
        .trim()
        .notEmpty()
        .escape()
        .withMessage('PostalCode is required'),
    body('Country')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Country is required'),
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