import { Investor } from '../models/investor.js';
import { Op, literal } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import AuthServiceError from '../common/helpers/ThrowError.js';


const accessTokenSecret = config.token.access;
const refreshTokenSecret = config.token.refresh;


export const login = async (userName, password) => {
    if (!userName || !password) {
        AuthServiceError.create(400, 'Username and password are required');
    }

    const investor = await Investor.scope('withPassword').findOne({
        where: {
            [Op.or]: [
                literal(`CONCAT(dial_code, phone) = '${userName}' AND status = 1`),
                { email: userName, status: 1 }
            ]
        }
    });

    if (!investor) {
         AuthServiceError.create(404, 'Investor not found');
    }

    if (!investor.password) {
         AuthServiceError.create(500, 'Invalid investor data');
    }

    const hashedPasswordFromPHP = (investor.password).replace(/^\$2y\$/, '$2b$');

    const isMatch = await bcrypt.compare(password, hashedPasswordFromPHP);
    if (!isMatch) {
         AuthServiceError.create(400, 'Invalid password');
    }

    // Generate tokens
    const accessToken = investor.generateAccessToken();
    const refreshToken = investor.generateRefreshToken();

    return { accessToken, refreshToken };
};

export const revokeVerifyToken = async (token) => {
    try {
        const payload = jwt.verify(token, accessTokenSecret);
        return { isValid: true, ...payload };
    } catch (error) {
        return { isValid: false, error: error.message };
    }
};

export const revokeAndGenerateAccessToken = async (token) => {
    const payload = jwt.verify(token, refreshTokenSecret);
    const investor = await Investor.findByPk(payload._id);

    if (!investor) {
         AuthServiceError.create(404, 'Investor not found');
    }

    return { accessToken: await investor.generateAccessToken() };
};

