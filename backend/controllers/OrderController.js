import {sequelize} from '../config/sequelize.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Product } from '../models/Product.js';
import { CartItem } from '../models/CartItem.js';

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
    delivery_fee,
    payment_method,
    note
  } = req.body;

  // Basic validation
  if (
    !first_name || !last_name || !email || !phone_number ||
    !delivery_address || !country || !state || !zipcode || !payment_method
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
        delivery_fee: delivery_fee || 0,
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


// Get user's all orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {
      user_id: userId,
    };

    if (status) {
      whereClause.status = status;
    }

    const { rows: orders, count } = await Order.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price', 'image_url'],
            },
          ],
        },
      ],
      order: [['ordered_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: 'success',
      orders,
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


// Get a single order
export const getSingleOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId  = req.params.id;

    const order = await Order.findOne({
      where: {
        id: orderId,
        user_id: userId
      },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'image_url', 'price']
            }
          ]
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


