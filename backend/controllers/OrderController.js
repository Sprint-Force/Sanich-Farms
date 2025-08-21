import {sequelize} from '../config/sequelize.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Product } from '../models/Product.js';
import { CartItem } from '../models/CartItem.js';
import { User } from '../models/User.js';

// Create and order
export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const {
    first_name,
    last_name,
    company_name,
    email,
    phone_number,
    delivery_address,
    country,
    state,
    zipcode,
    payment_method,
    note
  } = req.body;

  // Basic validation
  if (
    !first_name || !last_name || !email || !phone_number ||
    !delivery_address || !country || !state || !payment_method
  ) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    // Get cart items for the user
    const cartItems = await CartItem.findAll({
      where: { user_id: userId },
      include: [{ 
        model: Product,
       }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    // Calculate total amount
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.cart_quantity * item.Product.price;
    });

    // Add delivery fee if provided
    const finalAmount = totalAmount + (parseFloat(delivery_fee) || 0);

    let createdOrder;

    // Create order within a transaction
    await sequelize.transaction(async (t) => {
      const order = await Order.create({
        user_id: userId,
        first_name,
        last_name,
        company_name,
        email,
        phone_number,
        delivery_address,
        country,
        state,
        zipcode,
        delivery_fee: 0,
        total_amount: finalAmount,
        payment_method,
        status: 'pending',
        payment_status: 'unpaid',
        note: note || null,
        ordered_at: new Date()
      }, { transaction: t });

      // Prepare order items
      const orderItemsData = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.cart_quantity,
        price: item.Product.price
      }));

      await OrderItem.bulkCreate(orderItemsData, { transaction: t });

      // Clear cart
      await CartItem.destroy({ where: { user_id: userId }, transaction: t });

      createdOrder = order;
    });

    // Fetch full order with associated items and product info
    const fullOrder = await Order.findByPk(createdOrder.id, {
      include: [
        {
          model: OrderItem,
          include: [{ model: Product,}],
        },
      ],
    });

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      order: fullOrder,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
};


// Fetches all orders for both admin and user
export const getOrders = async (req, res) => {
  const { status, payment_status, delivery_status } = req.query;

  // Build filters from query params
  const filters = {};
  if (status) filters.status = status;
  if (payment_status) filters.payment_status = payment_status;
  if (delivery_status) filters.delivery_status = delivery_status;

  try {
    if (req.user.role === 'admin') {
      // Admin: can view all orders with optional filters
      const orders = await Order.findAll({
        where: filters,
        include: [{ model: User, attributes: ['name', 'email'] }],
        order: [['ordered_at', 'DESC']],
      });
      return res.status(200).json({ success: true, orders });
    } else {
      //  User: apply same filters + restrict to their own orders
      const userFilters = { ...filters, user_id: req.user.id };
      const orders = await Order.findAll({
        where: userFilters,
        order: [['ordered_at', 'DESC']],
      });
      return res.status(200).json({ success: true, orders });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};


// View order details for both admin and user
export const getSingleOrder = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const orderId = req.params.id;

    const whereClause = role === 'admin'
      ? { id: orderId }
      : { id: orderId, user_id: userId };

    const order = await Order.findOne({
      where: whereClause,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'image_url', 'price']
            }
          ]
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'] // so admin can see user info
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('❌ Error fetching single order:', error.message);
    res.status(500).json({ error: 'Something went wrong while retrieving the order.' });
  }
};
