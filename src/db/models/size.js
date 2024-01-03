import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Size = sequelize.define('size', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  size36: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size37: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size38: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size39: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size40: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size41: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size42: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size43: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size44: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size45: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size46: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  // productId: 'product_id',
});