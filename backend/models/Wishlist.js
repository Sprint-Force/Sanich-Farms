import { DataTypes } from 'sequelize';
import {sequelize} from '../config/sequelize.js';


export const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: 'wishlists',
        timestamps:true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);