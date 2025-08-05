import { Wishlist } from "../models/Wishlist.js"; 
import { Product } from "../models/Product.js";

// Add to wishlist
export const addToWishlist = async (req, res) =>{
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.'})
        }
        const existingItem = await Wishlist.findOne({
            where: {
                product_id: productId,
                user_id: userId
            }
        });

        if (existingItem) {
            return res.status(400).json({ message: 'Item already exists.'})
        }

        const wishlistItem = await Wishlist.create({
            user_id: userId,
            product_id: productId
        });

        res.status(202).json({
            status: 'success',
            wishlistItem,
        }); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to wishlist'})
    }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId

        const wishlistItem = await Wishlist.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });
        if (!wishlistItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        await wishlistItem.destroy();

        res.status(200).json({
            status: "success",
            message: "Item removed from wishlist"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove item from wishlist" });
    }
}

// Get wishlist item
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const wishlistItems = await Wishlist.findAll({
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
            wishlist: wishlistItems
        });
    } catch (error) {
        res.status(500).json({ error : "Failed to fetch wish list"})
    }
};