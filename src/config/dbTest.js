const dbConfig = {
    name: process.env.TEST_DB_NAME,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    options: {
        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT,
        dialect: process.env.TEST_DB_DIALECT,
        // Include other Sequelize configuration options as needed
    }
};

export default dbConfig;
