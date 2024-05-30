const dbConfig = {
    name: process.env.PRODUCTION_DB_NAME,
    user: process.env.PRODUCTION_DB_USER,
    password: process.env.PRODUCTION_DB_PASSWORD,
    options: {
        host: process.env.PRODUCTION_DB_HOST,
        port: process.env.PRODUCTION_DB_PORT,
        dialect: process.env.PRODUCTION_DB_DIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: true
            }
        }
    }
};

export default dbConfig;
