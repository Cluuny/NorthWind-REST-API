import { check, validationResult, matchedData } from "express-validator";

export const validateCreateRequestbody = [
    check('CustomerID')
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage('CustomerID is required'),
    check('EmployeeID')
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage('EmployeeID is required'),
    check('OrderDate')
        .exists()
        .notEmpty()
        .isISO8601()
        .toDate()
        .withMessage('OrderDate is required'),
    check('ShipperID')
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage('ShipperID is required'),
    check('Products')
        .exists()
        .notEmpty()
        .isArray()
        .withMessage('The list of products is required'),
    check('Products.*.ProductID')
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage('Missing ProductID on a Product'),
    check('Products.*.Quantity')
        .exists()
        .isNumeric()
        .notEmpty()
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