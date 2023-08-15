import { body, validationResult, matchedData } from "express-validator";

export const validateCreateRequestbody = [
    body('LastName')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('LastName is required'),
    body('FirstName')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('FirstName is required'),
    body('Photo')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Photo is required'),
    body('Notes')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Notes is required'),
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
    body('LastName')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('LastName must have a value'),
    body('FirstName')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('FirstName must have a value'),
    body('Photo')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Photo must have a value'),
    body('Notes')
        .optional()
        .isString()
        .notEmpty()
        .escape()
        .trim()
        .withMessage('Notes must have a value'),
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