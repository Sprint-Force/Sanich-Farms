import { Product } from "../models/Product.js";

// Get all products
export const getAllproducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { is_available : true },
            order: [['created_at', 'DESC']]
        });
            
        res.status(200).json({
            status: 'success',
            count: products.length,
            products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            error: 'Failed to retrieve products'
        });
    }
    
}