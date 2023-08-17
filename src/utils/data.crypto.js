import CryptoJS from "crypto-js";
import { AES_KEY } from "../../config/config.js";

export const encryptRequest = (req, res, next) => {
    console.log(req.body)
    Object.entries(req.body).forEach(([key, value]) => {
        if (typeof value === "object") {
            encrypt(value);
        } else if (Array.isArray(value)) {
            for (const object of value) {
                encrypt(object);
            }
        }
        else if (typeof value === "string") {
            req.body[key] = CryptoJS.AES.encrypt(value, AES_KEY).toString();
        }
    })
    console.log('------------------')
    console.log(req.body)
    next()
}
export const encrypt = (object) => {
    Object.entries(object).forEach(([key, value]) => {
        if (!value) {
            return;
        } else if (typeof value === "object") {
            encrypt(value);
        } else if (Array.isArray(value)) {
            encryptMany(value);
        }
        else if (typeof value === "string") {
            object[key] = CryptoJS.AES.encrypt(value, AES_KEY).toString();
        }
    })
    return object;
}
export const decrypt = (object) => {
    Object.entries(object).forEach(([key, value]) => {
        if (typeof value === "object") {
            decrypt(value);
        } else if (Array.isArray(value)) {
            decryptMany(value);
        }
        else if (typeof value === "string") {
            object[key] = CryptoJS.AES.decrypt(value, AES_KEY).toString(CryptoJS.enc.Utf8);
        }
    })
    return object;
}
export const encryptMany = (objects = []) => {
    let encryptedObjects = []
    objects.forEach(object => {
        encryptedObjects.push(encrypt(object));
    });
    return encryptedObjects;
};
export const decryptMany = (objects = []) => {
    let decryptedObjects = []
    objects.forEach(object => {
        decryptedObjects.push(decrypt(object));
    });
    return decryptedObjects;
};