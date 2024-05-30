const timeConfig = {
    tz: process.env.TZ,
    period: process.env.OTP_VALID_PERIOD,
    unit: process.env.OTP_PERIOD_UNIT,
    dateTimeFormat: process.env.DATE_TIME_FORMAT,
    dateFormat: process.env.DATE_FORMAT,
    timeFormat: process.env.TIME_FORMAT,
};

export default timeConfig;
