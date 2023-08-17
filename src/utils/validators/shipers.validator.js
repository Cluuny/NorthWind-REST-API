import { body, validationResult, matchedData } from 'express-validator';

export const validateCreateRequestbody = [
    body('ShipperName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ShipperName is required'),
    body('Phone')
        .exists()
        .isMobilePhone('any')
        .trim()
        .notEmpty()
        .withMessage('Phone is required'),
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
    body('ShipperName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('ShipperName is required'),
    body('Phone')
        .optional()
        .isMobilePhone('any')
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Phone is required'),
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