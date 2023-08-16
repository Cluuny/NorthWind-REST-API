import { body, validationResult, matchedData } from "express-validator";

export const validateCreateRequestbody = [
    body('CustomerID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('CustomerID is required'),
    body('EmployeeID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('EmployeeID is required'),
    body('ShipperID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('ShipperID is required'),
    body('OrderDate')
        .exists()
        .isString()
        .notEmpty()
        .escape()
        .withMessage('OrderDate is required'),
    body('Products[]')
        .exists()
        .isArray()
        .notEmpty()
        .withMessage('The list of products is required'),
    body('Products.*.ProductID')
        .exists()
        .isNumeric()
        .notEmpty()
        .escape()
        .withMessage('Missing ProductID on a Product'),
    body('Products.*.Quantity')
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