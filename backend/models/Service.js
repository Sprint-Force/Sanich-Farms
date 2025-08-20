import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";


export const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
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
    image_url : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_id : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

},
    {   tableName: 'services',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
     }
);