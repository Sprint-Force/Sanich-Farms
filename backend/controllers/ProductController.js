import { Product } from "../models/Product.js";
import { Op } from "sequelize";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            minPrice,
            maxPrice,
            rating,
            sortBy = 'created_at',
            order = 'DESC'
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

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            order: [[sortBy, order]],
            limit: parseInt(limit),
            offset
        });

        res.status(200).json({
            status: 'success',
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalProducts: count,
            count: products.length,
            products,
        });
    } catch (error) {
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
