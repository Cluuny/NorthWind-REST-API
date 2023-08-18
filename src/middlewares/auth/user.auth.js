import CryptoJS from "crypto-js"
import { SHA_KEY } from "../../../config/config.js"
import { UnauthorizedError } from "../../errors/UnauthorizedError.error.js"
import { MissingCredentialsError } from "../../errors/MissingCredentialsError.error.js"

export const validateUser = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const [token] = authorization.split(" ")
            const secureCredential = CryptoJS.SHA256(SHA_KEY).toString()
            if (token === secureCredential) {
                return next()
            }
            throw new UnauthorizedError("User Unauthorized")
        } else {
            throw new MissingCredentialsError("Credential not provided")
        }
    } catch (error) {
        if (error.name == 'MissingCredentialsError' || error.name == 'UnauthorizedError') {
            return res.status(401).json({ error: error.message })
        }
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}