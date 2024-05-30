import dbProduction from './dbProduction.js';
import dbDevelopment from './dbDevelopment.js';
import dbTest from './dbTest.js';
import dbLocal from './dbLocal.js';
import emailConfig from './emailConfig.js'
import smsConfig from './smsConfig.js'
import passwordConfig from './passwordConfig.js'
import tokenConfig from './tokenConfig.js'
import timeConfig from './timeConfig.js';

const env = process.env.NODE_ENV || 'local';

let config = {};

switch (env) {
    case 'production':
        config.db = dbProduction;
        break;
    case 'development':
        config.db = dbDevelopment;
        break;
    case 'test':
        config.db = dbTest;
        break;
    default:
        config.db = dbLocal; 
}

config.email = emailConfig;
config.sms = smsConfig;
config.password = passwordConfig;
config.token = tokenConfig;
config.time = timeConfig;

export default config;
