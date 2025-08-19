import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";

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


