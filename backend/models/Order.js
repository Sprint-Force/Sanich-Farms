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
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 20],
    },
  },
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  delivery_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
    validate: {
      min: 0,
    },
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  delivery_status: {
    type: DataTypes.ENUM('pending', 'delivered', 'returned'),
    allowNull: false,
    defaultValue: 'pending',
  },
  payment_method: {
    type: DataTypes.ENUM('cash', 'mobile_money', 'bank_transfer'),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.ENUM('unpaid', 'paid', 'failed', 'refunded'),
    allowNull: false,
    defaultValue: 'unpaid',
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000]
    }
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
