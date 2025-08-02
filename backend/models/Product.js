import { DataTypes } from 'sequelize';
import {sequelize} from '../config/sequelize.js';


// Product model
 export const Product = sequelize.define ('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
        type: DataTypes.ENUM('chicks', 'feeds', 'eggs', 'vitamins'),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
        isDecimal: true,
        min: 0,
    } 
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 0,
        isInt: true,
    }
    },
    rating: {
        type:  DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: null,
    },
    unit_of_measure: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    image_url : {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

},
    {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',       
        updatedAt: 'updated_at',
        paranoid: true,
       deletedAt: 'deleted_at',
    }
);


