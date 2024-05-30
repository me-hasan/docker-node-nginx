import { Investor } from '../models/investor.js';

import AuthServiceError from '../common/helpers/ThrowError.js';
import BoAccount from '../models/boAccount.js';



export const showInvestorProfile = async (userId) => {
    const investor = await Investor.findByPk(userId, {
        include: [{
            model: BoAccount,
            as: 'boAccount'
        }]
    });

    if (!investor) {
        AuthServiceError.create(404,'Investor not found');
    }

    const {
        boAccount,
        email,
        phone,
    } = investor;

    if (!boAccount) {
        return {
            image: null,
            tradeCode: null,
            fullName: null,
            email,
            phoneNumber: phone
        };
    }

    const {
        upload_photo = null,
        trade_code = null,
        first_name = null,
        last_name = null
    } = boAccount;

    const imagePath = upload_photo ? '/storage/uploads/bo/investor/signature/' + upload_photo : null;
    const fullName = `${first_name} ${last_name}`;

    const profile = {
        image: imagePath,
        tradeCode : trade_code,
        fullName,
        email,
        phoneNumber: phone
    };

    return profile;
};


