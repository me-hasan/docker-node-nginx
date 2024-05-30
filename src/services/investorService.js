import { Investor } from '../models/investor.js';
import { InvestorOtp } from '../models/investorOtp.js';
import { Op } from 'sequelize'; // Ensure Op is imported
import { UniqueIdHelper } from '../common/helpers/UniqueIdHelper.js';
import bcrypt from 'bcrypt';
import config from '../config/index.js';
import { OtpHelper } from '../common/helpers/OtpHelper.js';
import sequelize from '../database/db.js';


const defaultPassword = config.password.default;
const saltRounds = parseInt(config.password.salt);

import EmailProvider from '../providers/email/emailProvider.js';

const emailProvider = new EmailProvider();

export const allInvestors = async () => {
    return await Investor.findAll({
        where: {
            status: 1
        }
    });
};

export const showInvestor = async (investorId) => {
    return await Investor.findByPk(investorId);
};

export const findInvestorByEmailAndPhone = async (email, phone) => {
    const existingInvestor = await Investor.findOne({
        where: {
            email: email,
            phone: phone
        }
    });
    if (existingInvestor) {
        // invoke sendOptThroughSmsOrEmail
        return existingInvestor;
    }
    return false;
};

export const findActiveInvestorByEmailAndPhone = async (email, phone) => {
    const existingInvestor = await Investor.findOne({
        where: {
            [Op.and]: [
                { email: email, status: 1 },
                { phone: phone, status: 1 }
            ]
        }
    });
    if (existingInvestor) {
        // invoke sendOptThroughSmsOrEmail
        return existingInvestor;
    }
    return false;
};

export const createInvestor = async (newInvestorData) => {
    const { email, phone, dialCode } = newInvestorData;
    const existingInvestor = await Investor.findOne({
        where: {
            [Op.or]: [
                { email: email, status: 0 },
                { dial_code: dialCode, phone: phone, status: 0 }
            ]
        }
    });

    if (existingInvestor) {
        await Investor.update({email: email, dial_code: dialCode, phone: phone}, {
            where: {
                uuid: existingInvestor.uuid 
            }
        });
        existingInvestor.email = email;
        existingInvestor.phone = phone;
        existingInvestor.dialCode = dialCode;
        return existingInvestor;
    }
    newInvestorData.name = '';
    newInvestorData.password = await bcrypt.hash(defaultPassword, saltRounds);
    newInvestorData.investor_tracking_id = await UniqueIdHelper.generateUniqueId();
    newInvestorData.status = 0;
    return await Investor.create(newInvestorData);
};

export const updateInvestor = async (investorId, changes) => {
    
    const investor = await Investor.findByPk(investorId);
    if (investor) {
        // return 
       const result =  await investor.update(changes);
       return result;
    }
    return null;
};

export const setPasswordByInvestor = async (investorId, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password and assign it to the new variable
    
    const investor = await Investor.findByPk(investorId);
    if (investor) {
        // return 
        await investor.update({password:hashedPassword, status:1});
        
        // Generate tokens
        const accessToken = investor.generateAccessToken();
        const refreshToken = investor.generateRefreshToken();
    
        return { accessToken, refreshToken };
    }
    return null;
};

export const deleteInvestor = async (investorId) => {
    const investor = await Investor.findByPk(investorId);
    if (!investor) {
        return false;
    }
    await investor.destroy();
    return true;
};


export const verifyInvestorByOtp = async (investorId, otp) => {
    const investor = await Investor.findByPk(investorId);
    if (!investor) {
        return null;
    }

    const transaction = await sequelize.transaction();
    
    const validatedOtp = await InvestorOtp.findOne({
        where: {
            investor_id: investorId,
            otp: otp,
            is_used: false,  // Only find OTPs that have not been used
            expires_at: {
                [Op.gte]: OtpHelper.nowInTime()
            }
        }
    }, { transaction });

    if (validatedOtp) {
        await validatedOtp.update({ is_used: true }, { transaction });
        await transaction.commit();
        return true;
    } else {
        await transaction.rollback();
        return false;
    }
};


export const sendOptThroughSmsOrEmail = async (investor, otpNumber )=> {
     // Send OTP via email
     const subject = "Your OTP for Investor Platform";
     const message = `Your OTP is: ${otpNumber}.\nIt will expire in 5 minutes.`;
     await emailProvider.sendMail(investor.email, subject, message);
};

export const aliveOtp = async (newInvestorData) => {
    const { email, phone } = newInvestorData;
    const existingInvestor = await Investor.findOne({
        where: {
            phone: phone,
            email: email
        },
        include: [{
            model: InvestorOtp,
            as: 'investorOpt',
            where: {
                expires_at: {
                    [Op.gt]: OtpHelper.nowInTime()
                }
            },
            order: [['created_at', 'DESC']],
            limit: 1
        }]
    });

    return existingInvestor || null;
};
