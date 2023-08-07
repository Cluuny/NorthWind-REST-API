import CryptoJS from "crypto-js";
import { AES_KEY } from "../../config/config.js";
export const decrypt = (object) => {
    // console.log(object.CategoryName)
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
export const decryptMany = (objects = []) => {
    let decryptedObjects = []
    objects.forEach(object => {
        decryptedObjects.push(decrypt(object));
    });
    return decryptedObjects;
};