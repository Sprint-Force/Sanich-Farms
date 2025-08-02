import { sequelize } from './sequelize.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { CartItem } from '../models/CartItem.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';

// User -> CartItem
User.hasMany(CartItem, { foreignKey: 'user_id', as: 'cart_items' });
CartItem.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

// Product -> CartItem
Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cart_items' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'products' });

// User -> Order
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

// Order -> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'order_items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'orders' });

// Product -> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'order_items' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'products' });


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

