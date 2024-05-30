import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import  jwt from 'jsonwebtoken';
import config from '../config/index.js';
import InvestorOtp from './investorOtp.js';
import BoAccount from './boAccount.js';
import BuyingPower from './buyingPower.js';
import { Op } from 'sequelize'; // Ensure Op is imported



// Use environment variables for jwt secrets
const accessTokenSecret = config.token.access;
const refreshTokenSecret = config.token.refresh;
const accessTokenExpiresIn = config.token.expires;

export class Investor extends Model {
    generateAccessToken() {
        const accessToken = jwt.sign({ _id: this.uuid }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
        return accessToken;
    }

    generateRefreshToken() {
        const refreshToken = jwt.sign({ _id: this.uuid }, refreshTokenSecret);
        return refreshToken;
    }
}


Investor.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    investor_tracking_id: DataTypes.STRING,
    primary_trade_code: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    dial_code: DataTypes.STRING,
    phone: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    password: DataTypes.STRING,
    status: DataTypes.SMALLINT,
    profile_path: DataTypes.STRING,
    remember_token: DataTypes.STRING,
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, { sequelize, modelName: 'investor', timestamps: false, 
    defaultScope: {
        attributes: { exclude: ['password', 'remember_token', 'email_verified_at'] }
    }, scopes: {
        withPassword: {
            attributes: { include: ['password'] }
        }
    }
});

Investor.hasMany(InvestorOtp, {
    foreignKey: 'investor_id',
    localKey : 'uuid',
    as: 'investorOpt'
});

Investor.hasOne(BoAccount, {
    foreignKey: 'investor_id',
    localKey : 'uuid',
    as: 'boAccount'
});

Investor.hasMany(BuyingPower, {
    foreignKey: 'investor_id',
    localKey : 'uuid',
    as: 'buyingPower'
});

export default Investor;
