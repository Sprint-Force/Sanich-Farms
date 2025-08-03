import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/sequelize.js';




export const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cart_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        },
    },
},
    {
        tableName: 'cart_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
); 

 
 //
