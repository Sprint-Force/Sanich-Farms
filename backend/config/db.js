import { sequelize } from './sequelize.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { CartItem } from '../models/CartItem.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';

// User -> CartItem
User.hasMany(CartItem, { foreignKey: 'user_id', });
CartItem.belongsTo(User, { foreignKey: 'user_id', });

// Product -> CartItem
Product.hasMany(CartItem, { foreignKey: 'product_id', });
CartItem.belongsTo(Product, { foreignKey: 'product_id', });

// User -> Order
User.hasMany(Order, { foreignKey: 'user_id', });
Order.belongsTo(User, { foreignKey: 'user_id',});

// Order -> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id',});
OrderItem.belongsTo(Order, { foreignKey: 'order_id',});

// Product -> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id', });
OrderItem.belongsTo(Product, { foreignKey: 'product_id',});


// Test connection 
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (Neon) connected successfully.');
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized with DB");
  } catch (error) {
    console.error('❌ Unable to connect to Neon database:', error.message);
    process.exit(1); 
  }
};

export {
  sequelize,
  User,
  Product,
  CartItem,
  Order,
  OrderItem
};

