import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";
import { Booking } from "../models/Booking.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { Order } from "../models/Order.js";
import { Payment } from "../models/Payment.js";
import { User } from "../models/User.js"
import axios from "axios";

// PRODUCT MANAGEMENT API

// Add product (Admin only)
export const addProduct = async (req, res) => {
  const { 
    name, 
    description, 
    category,
    price, 
    stock_quantity, 
    rating,  
  } = req.body;

  // Basic validation
  if (!name || !description || !category || !price || !stock_quantity) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  let imageUrl = null;
  let imageId = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "sanich-farms/products");
    imageUrl = result.url;
    imageId = result.id;
  }

  try {
    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock_quantity,
      rating: rating || 0, 
      image_url: imageUrl,
      image_id: imageId,
      is_available: true 
    });

    return res.status(201).json({
      status: "success",
      message: "Product added successfully",
      product
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ 
      status: "failed",
      message: "Failed to add product. Try again." 
    });
  }
};

// Edit product (Admin only)
export const editProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let updates = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "sanich-farms/products");
      updates.image_url = result.url;
      updates.image_id = result.id;
    }

    await product.update(updates);

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to update product. Try again."
    });
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product
    await product.destroy();
    await product.update({ is_available: false });

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to delete product. Try again."
    });
  }
};



// SERVICE MANAGEMENT API

// Add Service (Admin only)
export const addService = async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  let imageUrl = null;
  let imageId = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "sanich-farms/services");
    imageUrl = result.url;
    imageId = result.id;
  }

  try {
    const service = await Service.create({
      name,
      description,
      price,
      image_url: imageUrl,
      image_id: imageId,
      is_available: true
    });

    return res.status(201).json({
      status: 'success',
      message: 'Service added successfully',
      service,
    });
  } catch (error) {
    console.error('Error adding service:', error);
    return res.status(500).json({ error: 'Failed to add service. Try again.' });
  }
};


// Edit Service (Admin only)
export const editService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    let imageUrl = service.image_url;
    let imageId = service.image_id;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "sanich-farms/services");
      imageUrl = result.url;
      imageId = result.id;
    }

    await service.update({
      ...req.body,
      image_url: imageUrl,
      image_id: imageId
    });

    return res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      service,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ error: 'Failed to update service. Try again.' });
  }
};


// Delete Service
export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.update({ is_available: false});

    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service. Try again.' });
  }
};

// BOOKING MANAGEMENT API

// Approve and schedule booking
export const approveBooking = async (req, res) => {
  const { id } = req.params;
  const { schedule_date, note } = req.body;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // update fields
    booking.status = 'scheduled';
    booking.schedule_date = schedule_date || booking.schedule_date;
    booking.note = note || booking.note;

    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking approved with schedule & note',
      booking
    });
  } catch (error) {
    console.error('Error approving booking:', error);
    res.status(500).json({ message: 'Failed to approve booking.' });
  }
};

// Reject booking
// controllers/bookingController.js
export const rejectBooking = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = 'rejected';
    booking.note = note || booking.note;

    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking rejected successfully',
      booking
    });
  } catch (error) {
    console.error('Error rejecting booking:', error);
    res.status(500).json({ error: 'Failed to reject booking.' });
  }
};

// Mark booking as paid
export const markBookingAsPaid = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.payment_status = 'paid';
    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking marked as paid',
      booking
    });
  } catch (error) {
    console.error('Error marking booking as paid:', error);
    res.status(500).json({ error: 'Failed to mark booking as paid.' });
  }
};

// Mark booking as complete
export const completeBooking = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "completed";
    booking.note = note;
    booking.completed_at = new Date();

    await booking.save();

    res.json({
      status: "success",
      message: "Booking marked as completed",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// ORDER MANAGEMENT API

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, delivery_status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only update allowed fields
    if (status) order.status = status; 
    if (delivery_status) order.delivery_status = delivery_status; 

    await order.save();

    return res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Update order error:", error.message);
    return res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

// Admin: Cancel an order
export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // If payment was made, initiate refund
    if (order.payment_status === "paid") {
      const payment = await Payment.findOne({ where: { order_id: order.id } });
      if (payment) {
        // Example refund using Paystack API
        await axios.post(
          "https://api.paystack.co/refund",
          { transaction: payment.transaction_reference, amount: payment.amount * 100 }, // in kobo
          {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
          }
        );
        payment.status = "failed"; // mark payment as refunded/failed
        await payment.save();
      }
    }

    // Update order status
    order.status = "cancelled";
    await order.save();

    return res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel order error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to cancel order", error: error.message });
  }
};

// Mark order as paid for cash on delivery order
export const markOrderAsPaid = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if(!order) {
      res.status(404).json({ error: "Order not found"})
    }

    if (order.payment_method !== "cash") {
      return res.status(400).json({ 
        error: "Only cash-on-delivery orders can be manually marked as paid" 
      });
    }
    order.payment_status = 'paid';
    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Order marked as paid',
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to mark order as paid"})
  }
}


// USER MANAGEMENT APIs
// Get all users
export const getUsers = async (req, res) => {
  try {
    // Query users
    const users = await User.findAll({
      where: { role: 'customer'},
      attributes: ['id', 'name', 'email', 'phone_number', 'address', 'company_name'],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      count: users.length,
      users,
    })
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to retrieve users"})
  }
}


