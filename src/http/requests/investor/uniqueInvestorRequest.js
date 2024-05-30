import { Investor } from '../../../models/investor.js';
import { Op } from 'sequelize'; // Ensure Op is imported
import { SendResponse } from '../../../common/utils/sendResponse.js';

const validateUniqueInvestor = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        // Check if the email or phone number is already in use with status 1
        const existingInvestor = await Investor.findOne({
            where: {
                [Op.or]: [
                    { email: email, status: 1 },
                    { phone: phone, status: 1 }
                ]
            }
        });
        if (existingInvestor) {
            if (existingInvestor.email === email) {
                SendResponse(res, 400, null, 'Email already in use.');
                return; // Stop the middleware chain here
            }

            if (existingInvestor.phone === phone) {
                SendResponse(res, 400, null, 'Phone number already in use.');
                return; // Stop the middleware chain here
            }
        }

        next(); // This is called only if no response has been sent yet
    } catch (error) {
        if (!res.headersSent) { // Check if headers have not been sent before sending the error response
            SendResponse(res, 500, null, 'Server error while validating investor data.');
            return; // Stop the middleware chain here
        }
    }
};

export default validateUniqueInvestor;
