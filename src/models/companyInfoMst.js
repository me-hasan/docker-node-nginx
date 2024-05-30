import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import ImdsMkIstats from './imdsMkIstats.js';

export class CompanyInfoMst extends Model {}

CompanyInfoMst.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    com_code: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: true
    },
    trading_code: {
        type: DataTypes.STRING(30),
        unique: false,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    authorized_capital: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    company_debut_date: {
        type: DataTypes.STRING, // Change to DataTypes.DATEONLY if it's an actual date format
        allowNull: true
    },
    company_paid_up_capital: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    type_of_instrument: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    face_per_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    market_lot: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    total_out_standing_securities: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    company_listing_year: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    company_category: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    company_electric_share: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    company_address_head_office: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    company_factory_address: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    company_contact_number: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    company_email: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    company_website: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    sector: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sector_color_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { sequelize, modelName: 'CompanyInfoMst', tableName:'scrap_company_information', timestamps: false });

CompanyInfoMst.hasOne(ImdsMkIstats, {
    foreignKey: 'mkstat_instrument_code',
    sourceKey : 'com_code',
    as: 'imdsMkIstats'
});

CompanyInfoMst.hasMany(ImdsMkIstats, {
    foreignKey: 'mkstat_instrument_code',
    sourceKey : 'com_code',
    as: 'imdsMkIstatsMany'
});

export default CompanyInfoMst;
