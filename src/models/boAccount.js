import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class BoAccount extends Model {}


BoAccount.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    investor_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    account_type: {
        type: DataTypes.ENUM('individual', 'joint'),
        defaultValue: 'individual',
    },
    account_open_from: {
        type: DataTypes.ENUM('own', 'link'),
        comment: 'own is account open from in house and link is account open from another house',
    },
    bo_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trade_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    upload_photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    upload_signature: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    father_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mother_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    spouse_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    residence_type: {
        type: DataTypes.ENUM('bd', 'nrb'),
        allowNull: false,
    },
    tin_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    upload_tin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    upload_nid_front_side: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    upload_nid_back_side: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passport_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    place_of_issue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_issue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_expiration: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    upload_passport: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    present_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    present_division: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    present_district: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    present_upazila: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    present_country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    present_postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permanent_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permanent_division: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permanent_district: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permanent_upazila: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permanent_country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permanent_postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bank_routing: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branch_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank_district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank_account_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    upload_bank_account_leaf_photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { sequelize, modelName: 'BoAccount', tableName:'bo_accounts', timestamps: false });

export default BoAccount;

