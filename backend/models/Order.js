import { DataTypes } from 'sequelize';
import {sequelize} from '../config/sequelize.js';



export const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, 
        validate: {
            min: 0
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'processing', 'delivered', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false,
    },
     payment_method: {
    type: DataTypes.ENUM('cash', 'mobile_money', 'card'),
    allowNull: false,
    },
    payment_status: {
    type: DataTypes.ENUM('unpaid', 'paid', 'failed', 'refunded'),
    allowNull: false,
    defaultValue: 'unpaid',
    },
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
  delivery_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
    validate: {
      min: 0,
    },
  },
  ordered_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  delivered_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  cancelled_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'orders',
  timestamps: false,
    
});



