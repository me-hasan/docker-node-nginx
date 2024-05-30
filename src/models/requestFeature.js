import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import CompanyInfoMst from './companyInfoMst.js';
import WatchListMst from './watchListMst.js';
import Investor from './investor.js';
import RequestFeatureVote from './requestFeatureVote.js';

export class RequestFeature extends Model {}

RequestFeature.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Investor',
            key: 'uuid'
        }
    },
    updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Investor',
            key: 'uuid'
        }
    },
    status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1=active, 0=Inactive'
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
}, { sequelize, modelName: 'RequestFeature', tableName:'request_features', timestamps: false });


RequestFeature.belongsTo(Investor, { 
    foreignKey: 'created_by', 
    sourceKey: 'uuid', 
    as: 'createdByInvestor' 
});

RequestFeature.hasMany(RequestFeatureVote, {
    foreignKey: 'request_feature_id', 
    sourceKey : 'id',
    as: 'requestFeatureVotes'
});


export default RequestFeature;
