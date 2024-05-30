import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import CompanyInfoMst from './companyInfoMst.js';
import WatchListMst from './watchListMst.js';

export class WatchListChd extends Model {}

WatchListChd.init({
    watch_list_chd_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    watch_list_mst_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'watch_list_msts', 
            key: 'watch_list_mst_id', 
        }
    },
    com_code: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'company code'
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
}, { sequelize, modelName: 'WatchListChd', tableName:'watch_list_chds', timestamps: false });

// WatchListChd.belongsTo(WatchListMst, { foreignKey: 'watch_list_mst_id', onDelete: 'CASCADE' });

WatchListChd.hasMany(CompanyInfoMst, {
    foreignKey: 'com_code',
    sourceKey : 'com_code',
    as: 'companyInfoMst'
});


export default WatchListChd;
