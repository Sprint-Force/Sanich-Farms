import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity } = req.body;

        if(!product_id || !quantity || quantity <1) {
            return res.status(400).json({ error: "Product ID and valid product quantity is required" });
        }

        const product = await Product.findOne({ where: {id: product_id, is_available: true}});
        if(!product) {
            return res.status(404).json({ error: "Product not found or not available"});
        }

        const existingItem = await CartItem.findOne({ where: {user_id: userId, product_id: product_id}});
        
        let cartItem;

        if(existingItem) {
            existingItem.cart_quantity += quantity;
            await existingItem.save();
            existingItem = cartItem;
        } else {
            cartItem = await CartItem.create({
                user_id : userId,
                product_id: product_id,
                cart_quantity: quantity
            });
        };

        res.status(200).json({
            status: "success",
            message: "Item added to cart"
        });
    } catch (error) {
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

        res.status(200).json({
            status: "success",
            message: "Item removed from cart"
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
};

// Update cart
export const updateCartItem = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try{
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

            const updatedCart = await CartItem.findAll({ where: { user_id: userId } });

            res.status(200).json({
                status: "success",
                cart: updatedCart
            });

    } catch (error) {
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
                    attributes: ['id', 'name', 'price', 'image_url']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: "success",
            cart: cartItems
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};
