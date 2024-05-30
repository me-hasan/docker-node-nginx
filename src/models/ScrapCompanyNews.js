import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import moment from 'moment-timezone';

export class ScrapCompanyNews extends Model {}

ScrapCompanyNews.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
},
trade_code: {
    type: DataTypes.STRING(30),
    allowNull: true,
},
title: {
    type: DataTypes.STRING(500),
    allowNull: false,
},
description: {
    type: DataTypes.TEXT,
    allowNull: false,
},
news_date: {
    type: DataTypes.STRING(20),
    allowNull: false,
    get() {
        const rawValue = this.getDataValue('news_date');
        return rawValue ? moment(rawValue).format('YYYY-MM-DD') : null;
    },
    set(value) {
        this.setDataValue('news_date', moment(value).format('YYYY-MM-DD'));
    }
},
news_source: {
    type: DataTypes.STRING(20),
    allowNull: true,
},
news_type: {
    type: DataTypes.STRING(20),
    allowNull: true,
},
news_link: {
    type: DataTypes.STRING(300),
    allowNull: true,
},
news_image_link: {
    type: DataTypes.STRING(200),
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
}, { sequelize, modelName: 'ScrapCompanyNews', tableName:'scrap_company_news', timestamps: false });

export default ScrapCompanyNews;
