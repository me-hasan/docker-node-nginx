import { Sequelize } from 'sequelize';

import config  from '../config/index.js';

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        ...config.db.options,
        dialect: 'postgres',
        dialectOptions: {
            ssl: config.db.options.ssl || false, // Set SSL options from config, default to false
        },
    }
);


export default sequelize;
