import moment from 'moment-timezone';
import config from '../../config/index.js';

export class OtpHelper {
    // Generate a 6-digit OTP number
    static generateOtp() {
        return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    }

    // Return the current time plus five minutes in UTC
    static fiveMinuteLater() {
        return moment.utc().add(parseInt(config.time.period, 10), config.time.unit).format(config.dateTimeFormat);
    }

    // Current time in Dhaka time zone for display purposes
    static nowInTime() {
        return moment().tz(config.time.tz); 
    }


    static utcTimeFormat(dateTime) {
        return moment(dateTime).tz(config.time.tz);
    }


    // Check if the given OTP expiry time is still valid
    static isOtpValid(otpExpiryTime) {
        const nowInTime = this.nowInTime();
        const expiryInDhaka = this.utcTimeFormat(otpExpiryTime);
        return nowInTime.isBefore(expiryInDhaka);
    }

    // Check the validity of the OTP in the aliveOtpData
    static checkOtpValidity(aliveOtpData) {
        const currentTimeInDhaka = this.nowInTime();
        if (!aliveOtpData || !aliveOtpData.investorOpt || aliveOtpData.investorOpt.length === 0) {
            return { isValid: false };
        }
        
        const isOtpValid = (otpRecord) => {
            const otpExpiryTime = this.utcTimeFormat(otpRecord.expires_at);
            return !otpRecord.is_used && otpExpiryTime.isAfter(currentTimeInDhaka);
        };
    
        const validOtp = aliveOtpData.investorOpt.find(isOtpValid);  // assuming investorOpt is the array
    
        if (!validOtp) {
            return { isValid: false };
        }
    
        const otpExpiry = this.utcTimeFormat(validOtp.expires_at);  // Ensure this method handles time zones correctly
        const timeDiff = otpExpiry.diff(currentTimeInDhaka, 'minutes');  // Added 'minutes' for clarity
    
        return { isValid: true, remainingTime: timeDiff };
    }
    
    
}
