import { DataTypes } from 'sequelize';
import {sequelize} from '../config/sequelize.js';

export const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01, 
      },
    },

    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "GHS",
    },

    payment_method: {
      type: DataTypes.ENUM("mobile_money", "bank_transfer", "card", "cash"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "paid", "failed", "refunded", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },

    transaction_reference: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    provider_response: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  
  {
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
