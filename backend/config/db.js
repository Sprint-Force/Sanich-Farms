import { sequelize } from './sequelize.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { CartItem } from '../models/CartItem.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Wishlist } from '../models/Wishlist.js';
import { Service } from '../models/Service.js';
import { Booking } from '../models/Booking.js';
import { Payment } from '../models/Payment.js';


User.hasMany(CartItem, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(CartItem, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(OrderItem, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Wishlist, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Wishlist.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(Wishlist, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Booking, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Service.hasMany(Booking, { foreignKey: 'service_id', onDelete: 'CASCADE' });
Booking.belongsTo(Service, { foreignKey: 'service_id' });

Payment.belongsTo(Order, { foreignKey: "order_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });
Order.hasOne(Payment, { foreignKey: "order_id" });





// Test connection 
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (Neon) connected successfully.');
    //await sequelize.sync({ alter: true });
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

