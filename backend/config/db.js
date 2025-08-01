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

// Test connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (Neon) connected successfully.');
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized with DB");
  } catch (error) {
    console.error('❌ Unable to connect to the Neon database:', error.message);
    process.exit(1); 
  }
};

