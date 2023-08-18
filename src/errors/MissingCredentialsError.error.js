export class MissingCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingCredentialsError";
    }
}