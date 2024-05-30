import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import RequestFeature from './requestFeature.js';
import Investor from './investor.js';

export class RequestFeatureVote extends Model {}

RequestFeatureVote.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    request_feature_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'RequestFeature',
            key: 'id'
        }
    },
    investor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Investor',
            key: 'uuid'
        }
    },
    vote_status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        comment: '1=active, 0=Inactive'
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
}, { sequelize, modelName: 'RequestFeatureVote', tableName:'request_feature_votes', timestamps: false });

// RequestFeatureVote.belongsTo(RequestFeature, { foreignKey: 'request_feature_id', sourceKey: 'id', as: 'requestFeature' });
// RequestFeatureVote.belongsTo(Investor, { foreignKey: 'investor_id', sourceKey: 'uuid', as: 'votedByInvestor' });


export default RequestFeatureVote;
