import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Connect using Neon PostgreSQL URL
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false,
});