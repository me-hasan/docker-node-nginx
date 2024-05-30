const dbConfig = {
    name: process.env.DEVELOPMENT_DB_NAME,
    user: process.env.DEVELOPMENT_DB_USER,
    password: process.env.DEVELOPMENT_DB_PASSWORD,
    options: {
        host: process.env.DEVELOPMENT_DB_HOST,
        port: process.env.DEVELOPMENT_DB_PORT,
        dialect: process.env.DEVELOPMENT_DB_DIALECT,
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        }
    }
};

export default dbConfig;
