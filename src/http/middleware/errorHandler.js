import { logger } from "../../config/logger.js";

export const ErrorHandler = (err, req, res, next) => {
    // error storing logs
    logger.error(err.message, err);

    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send({ status, message });
};