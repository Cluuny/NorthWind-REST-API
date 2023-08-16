import { check, validationResult, matchedData } from "express-validator";

export const validateCreateRequestbody = [
    check('CustomerID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('CustomerID is required'),
    check('EmployeeID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('EmployeeID is required'),
    check('ShipperID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('ShipperID is required'),
    check('OrderDate')
        .exists()
        .isDate({
            format: 'AAAA-MM-DDTHH:MM:SS.SSSZ'
        })
        .notEmpty()
        .escape()
        .withMessage('OrderDate is required'),
    check('Products[]')
        .exists()
        .isArray()
        .notEmpty()
        .withMessage('The list of products is required'),
    check('Products.*.ProductID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('Missing ProductID on a Product'),
    check('Products.*.Quantity')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('Missing Quantity on a Product'),
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