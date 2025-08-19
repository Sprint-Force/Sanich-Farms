import { Product } from "../models/Product.js";

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
    return res.status(400).json({ message: "Please provide all required fields" });
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
      return res.status(404).json({ message: "Product not found" });
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
      return res.status(404).json({ message: "Product not found" });
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

