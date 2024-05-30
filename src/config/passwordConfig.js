const passwordConfig = {
    default: process.env.DEFAULT_PASSWORD,
    salt: process.env.BCRYPT_SALT_ROUNDS,
};

export default passwordConfig;
