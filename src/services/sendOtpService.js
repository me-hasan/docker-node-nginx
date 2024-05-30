import { OtpHelper } from '../common/helpers/OtpHelper.js';
import { InvestorOtp } from '../models/investorOtp.js';

export const generateOtpAndStore = async (investor) => {
    try {
        // Generate OTP and calculate expiration time
        const otpNumber = OtpHelper.generateOtp();
        const expiresAt = OtpHelper.fiveMinuteLater();

        // Create OTP record for the investor
        await InvestorOtp.create({
            investor_id: investor.uuid,
            otp: otpNumber,
            expires_at: expiresAt
        });

        return otpNumber;
    } catch (error) {
        // Handle potential errors, such as issues in sending the email
        console.error('Error in generateAndSendOtp:', error);
        throw new Error('Unable to generate and send OTP.');
    }
};




