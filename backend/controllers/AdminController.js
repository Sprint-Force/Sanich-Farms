import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";
import { Booking } from "../models/Booking.js";

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
    image_url 
  } = req.body;

  // Basic validation
  if (!name || !description || !category || !price || !stock_quantity || !image_url) {
    return res.status(400).json({ error: "Please provide all required fields" });
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
      image_url,
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

    // Update only provided fields
    await product.update(req.body);

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

// Add Service
export const addService = async (req, res) => {
  const { name, description, price, image_url } = req.body;

  if (!name || !description || !price || !image_url) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const service = await Service.create({
      name,
      description,
      price,
      image_url,
      is_available: true
    });

    res.status(201).json({
      status: 'success',
      message: 'Service added successfully',
      service,
    });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Failed to add service. Try again.' });
  }
};


// Edit Service
export const editService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Update only provided fields
    await service.update(req.body);

    await service.save();

    res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      service,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service. Try again.' });
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
    booking.completedAt = new Date();

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



