import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, productId, quantity } = req.body;

        // Support both product_id and productId for flexibility
        const actualProductId = product_id || productId;

        if(!actualProductId || !quantity || quantity < 1) {
            return res.status(400).json({ error: "Product ID and valid product quantity is required" });
        }

        const product = await Product.findOne({ where: {id: actualProductId, is_available: true}});
        if(!product) {
            return res.status(404).json({ error: "Product not found or not available"});
        }

        const existingItem = await CartItem.findOne({ where: {user_id: userId, product_id: actualProductId}});
        
        let cartItem;

        if(existingItem) {
            existingItem.cart_quantity += quantity;
            await existingItem.save();
            cartItem = existingItem; // Fixed: was incorrectly assigned
        } else {
            cartItem = await CartItem.create({
                user_id : userId,
                product_id: actualProductId,
                cart_quantity: quantity
            });
        }

        // Return the updated cart after adding item
        const updatedCart = await CartItem.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image_url', 'category']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: "success",
            message: "Item added to cart",
            cart: updatedCart
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
};


// Remove from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const cartItem = await CartItem.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        await cartItem.destroy();

        // Return the updated cart after removing item
        const updatedCart = await CartItem.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image_url', 'category']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: "success",
            message: "Item removed from cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
};

// Update cart
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const { quantity } = req.body;

        if (quantity == null || quantity < 0) {
            return res.status(400).json({ error: "Quantity must be 0 or a positive number" });
        }

        const cartItem = await CartItem.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        if (quantity === 0) {
            await cartItem.destroy();
        } else {
            cartItem.cart_quantity = quantity;
            await cartItem.save();
        }

        // Return the updated cart
        const updatedCart = await CartItem.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image_url', 'category']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: "success",
            message: quantity === 0 ? "Item removed from cart" : "Item quantity updated",
            cart: updatedCart
        });

    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({ error: "Failed to update cart item" });
    }
};

// View cart
export const viewCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await CartItem.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image_url', 'category', 'description']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: "success",
            cart: cartItems
        });
    } catch (error) {
        console.error('View cart error:', error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await CartItem.destroy({
            where: { user_id: userId }
        });

        res.status(200).json({
            status: "success",
            message: "Cart cleared successfully",
            cart: []
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ error: "Failed to clear cart" });
    }
};
