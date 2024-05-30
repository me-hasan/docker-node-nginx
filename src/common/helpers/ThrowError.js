export default class ThrowError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static create(status, message) {
        throw new ThrowError(status, message);
    }
}
