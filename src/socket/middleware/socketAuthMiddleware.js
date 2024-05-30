import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import moment from 'moment';
import { logger } from '../../config/logger.js';

const accessTokenSecret = config.token.access;

const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.headers['x-auth-token'];
    if (!token) {
        logger.error('Authentication error: No token provided');
        return next(new Error('Authentication error: No token provided'));
    }

    try {
        const options = {
            ignoreExpiration: false, // Ensure token expiration is not ignored
        };

        const investorClaim = jwt.verify(token, accessTokenSecret, options);

        if (isTokenExpired(investorClaim)) {
            logger.error('Authentication error: Token has expired');
            throw new Error('Authentication error: Token has expired');
        } else {
            socket.user = investorClaim;
            next();
        }

    } catch (ex) {
        logger.error('Authentication error: Invalid token');
        next(new Error('Authentication error: Invalid token'));
    }
};

const isTokenExpired = (token) => {
    const currentTime = moment();
    const expirationTime = moment.unix(token.exp);
    return currentTime.isAfter(expirationTime);
};

export default socketAuthMiddleware;
