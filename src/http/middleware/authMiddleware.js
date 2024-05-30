import  jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import moment from 'moment';
import { SendResponse } from '../../common/utils/sendResponse.js';

const accessTokenSecret = config.token.access;

export const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return SendResponse(res, 401, null, 'Access denied. No token has been provided.');
    try{
        const options = {
            ignoreExpiration: true, // Do not ignore token expiration
        };

        const investorClaim = jwt.verify(token, accessTokenSecret, options);

        if (isTokenExpired(investorClaim)) {
            await handleExpiredToken(req, res, next);
        } else {
            req.user = investorClaim;
            next();
        }

    }catch(ex){
        SendResponse(res, 400, ex, 'Invalid token');   
    }
};

const isTokenExpired = (token) => {
    const currentTime = moment();
    const expirationTime = moment.unix(token.exp);

    // Compare the current time with token's expiration time
    return currentTime.isAfter(expirationTime);
};

const handleExpiredToken = async (req, res, next) => {
    // If refreshing the token, update req.user with the new token data
    // Otherwise, send an appropriate response
    SendResponse(res, 401, null, 'Access denied. Token has expired.');
};