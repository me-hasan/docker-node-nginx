import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import WatchListChd from './watchListChd.js';

export class WatchListMst extends Model {}

WatchListMst.init({
    watch_list_mst_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    watch_list_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    short_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    investor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'investors', 
            key: 'uuid',      
        }
    },
    status: {
        type: DataTypes.SMALLINT,
        allowNull: false
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
}, { sequelize, modelName: 'WatchListMst', tableName:'watch_list_msts', timestamps: false });

WatchListMst.hasMany(WatchListChd, {
    foreignKey: 'watch_list_mst_id',
    sourceKey : 'watch_list_mst_id',
    onDelete: 'CASCADE',
    as: 'watchListChd'
});

export default WatchListMst;
