import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Product = sequelize.define('product', {
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artikul: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  subcategory_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});