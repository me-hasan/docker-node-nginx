import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class CompanyNews extends Model {}

CompanyNews.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
com_code: {
  type: DataTypes.STRING(30),
  allowNull: true
},
title: {
  type: DataTypes.STRING(500),
  allowNull: false
},
description: {
  type: DataTypes.TEXT,
  allowNull: false
},
news_date: {
  type: DataTypes.STRING(20),
  allowNull: false
},
news_from: {
  type: DataTypes.STRING(20),
  allowNull: false
},
news_link: {
  type: DataTypes.STRING(300),
  allowNull: true
},
news_image_link: {
  type: DataTypes.STRING(200),
  allowNull: true
}
,created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
},
updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}
}, { sequelize, modelName: 'CompanyNews', tableName:'scrap_company_news', timestamps: false });

export default CompanyNews;
