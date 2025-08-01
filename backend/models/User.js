import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';
import { CartItem } from './CartItem.js';


// User model
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]{10,15}$/ 
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(150),
        defaultValue: 'customer'
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    reset_code: {
      type: DataTypes.STRING(6), 
      allowNull: true,
    },

    reset_code_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    }


},
    {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
User.hasMany(CartItem, { foreignKey: 'user_id' });
CartItem.belongsTo(User, { foreignKey: 'user_id' });

