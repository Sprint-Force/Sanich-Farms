import { Wishlist } from "../models/Wishlist.js"; 
import { Product } from "../models/Product.js";

// Add to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const product = await Product.findOne({ where: { id: productId } });
        if (!product) return res.status(404).json({ error: 'Product not found.' });

        const existingItem = await Wishlist.findOne({
            where: { product_id: productId, user_id: userId }
        });

        if (existingItem) {
            return res.status(400).json({ error: 'Item already exists in wishlist.' });
        }

        await Wishlist.create({ user_id: userId, product_id: productId });

        const updatedWishlist = await Wishlist.findAll({
            where: { user_id: userId },
            include: [
                { model: Product, attributes: ['id','name','price','image_url','category','description'] }
            ],
            order: [['created_at','DESC']]
        });

        res.status(201).json({ status: 'success', message: 'Item added to wishlist', wishlist: updatedWishlist });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({ error: 'Failed to add item to wishlist' });
    }
};


// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const wishlistItem = await Wishlist.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        if (!wishlistItem) {
            return res.status(404).json({ error: "Item not found in wishlist" });
        }

        await wishlistItem.destroy();

        // Return the updated wishlist
        const updatedWishlist = await Wishlist.findAll({
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
            message: "Item removed from wishlist",
            wishlist: updatedWishlist
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({ error: "Failed to remove item from wishlist" });
    }
};

// Get wishlist items
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const wishlistItems = await Wishlist.findAll({
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
            wishlist: wishlistItems
        });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
};

// Clear entire wishlist
export const clearWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        await Wishlist.destroy({
            where: { user_id: userId }
        });

        res.status(200).json({
            status: "success",
            message: "Wishlist cleared successfully",
            wishlist: []
        });
    } catch (error) {
        console.error('Clear wishlist error:', error);
        res.status(500).json({ error: "Failed to clear wishlist" });
    }
};