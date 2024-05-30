const dbConfig = {
    name: process.env.LOCAL_DB_NAME,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    options: {
        host: process.env.LOCAL_DB_HOST,
        port: process.env.LOCAL_DB_PORT,
        dialect: 'postgres',
        // Include other Sequelize configuration options as needed
    }
};

export default dbConfig;
