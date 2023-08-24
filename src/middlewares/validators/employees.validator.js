import { check, query, validationResult, matchedData } from "express-validator";

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
    check('LastName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('LastName is required'),
    check('FirstName')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('FirstName is required'),
    check('Photo')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Photo is required'),
    check('Notes')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Notes is required'),
    check('BirthDate')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('BirthDate is required'),
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
    check('LastName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('LastName must have a value'),
    check('FirstName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('FirstName must have a value'),
    check('Photo')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Photo must have a value'),
    check('Notes')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Notes must have a value'),
    check('BirthDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('BirthDate is required'),
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