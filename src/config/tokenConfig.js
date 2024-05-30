const tokenConfig = {
    access: process.env.ACCESS_TOKEN_SECRET,
    refresh: process.env.REFRESH_TOKEN_SECRET,
    expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
};

export default tokenConfig;
