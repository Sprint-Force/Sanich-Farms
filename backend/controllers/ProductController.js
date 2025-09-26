import { Product } from "../models/Product.js";
import { Op } from "sequelize";

    // Get all products
    export const getAllProducts = async (req, res) => {
        try {
            const {
                page = 1,
                limit = 12,
                category,
                minPrice,
                maxPrice,
                rating,
                sortBy = 'created_at',
            } = req.query;

            const offset = (page - 1) * limit;

            const whereClause = {
                is_available: true,
            };

            if (category) {
                whereClause.category = category;
            }

            if (minPrice && maxPrice) {
                whereClause.price = {
                    [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]
                };
            }

            if (rating) {
                whereClause.rating = {
                    [Op.gte]: parseFloat(rating)
                };
            }
            // Sorting
            let order = [["created_at", "DESC"]]; // default: latest
            switch (sortBy) {
            case "latest":
                order = [["created_at", "DESC"]];
                break;
            case "name_asc":
                order = [["name", "ASC"]];
                break;
            case "price_asc":
                order = [["price", "ASC"]];
                break;
            case "price_desc":
                order = [["price", "DESC"]];
                break;
            }

            const { count, rows: products } = await Product.findAndCountAll({
                where: whereClause,
                order,
                limit: parseInt(limit),
                offset
            });

            res.status(200).json({
                status: 'success',
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalCount: count,
                count: products.length,
                products,
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                error: 'Failed to retrieve products'
            });
        }
    };


// Get single product
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};


// Get related products based on the current selected products
export const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        // Get current product
        const currentProduct = await Product.findByPk(id);
        if (!currentProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Find related products in the same category, excluding the current product
        const relatedProducts = await Product.findAll({
            where: {
                category: currentProduct.category,  
                id: { [Op.ne]: id }, // Exclude current product
                is_available: true
            },
            limit: 5 
        });

        res.status(200).json({ relatedProducts });
    } catch (error) {
        console.error("Error in getRelatedProducts:", error);
        res.status(500).json({ error: 'Failed to fetch related products' });
    }
}