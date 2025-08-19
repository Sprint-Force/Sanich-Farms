import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";


export const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE'
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE'
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isInFuture(value) {
        if (new Date(value) < new Date()) {
          throw new Error('Booking date must be in the future');
        }
      }
    }
  },
  schedule_date: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    }
  },

  status: {
    type: DataTypes.ENUM('pending', 'scheduled', 'completed', 'rejected', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
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
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
});
