import { Op } from "sequelize";
import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";

// Search products and services
export const search = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, category, type, sortBy, page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;

    let where = {};

    // Keyword search (ILIKE for case-insensitive match)
    if (keyword) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${keyword}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } }
      ];
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Price filter
    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      where.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      where.price = { [Op.lte]: maxPrice };
    }

    // Sorting
    let order = [["created_at", "DESC"]]; 
    if (sortBy === "price_asc") order = [["price", "ASC"]];
    if (sortBy === "price_desc") order = [["price", "DESC"]];
    if (sortBy === "name") order = [["name", "ASC"]];

    let results = [];
    let totalCount = 0;

    if (type === "product") {
      // Search only products
      const { rows, count } = await Product.findAndCountAll({
        where,
        order,
        limit: pageSize,
        offset
      });

      results = rows.map(p => ({ ...p.toJSON(), type: "product" }));
      totalCount = count;

    } else if (type === "service") {
      // Search only services
      const { rows, count } = await Service.findAndCountAll({
        where,
        order,
        limit: pageSize,
        offset
      });

      results = rows.map(s => ({ ...s.toJSON(), type: "service" }));
      totalCount = count;

    } else {
      // Default: search both products and services
      const [products, services] = await Promise.all([
        Product.findAll({ where, order, limit: pageSize, offset }),
        Service.findAll({ where, order, limit: pageSize, offset })
      ]);

      results = [
        ...products.map(p => ({ ...p.toJSON(), type: "product" })),
        ...services.map(s => ({ ...s.toJSON(), type: "service" }))
      ];

      totalCount = results.length; 
    }

    res.status(200).json({
      status: 'success',
      total: totalCount,
      currentPage: pageNumber,
      pageSize,
      results
    });

  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ error: "Server error while fetching results" });
  }
};




// Autocomplete across products and services
export const autocomplete = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const [products, services] = await Promise.all([
      Product.findAll({
        attributes: ["id", "name"],
        where: { name: { [Op.iLike]: `${keyword}%` } }, 
        limit: 10
      }),
      Service.findAll({
        attributes: ["id", "name"],
        where: { name: { [Op.iLike]: `${keyword}%` } }, 
        limit: 10
      })
    ]);

    // Add type so frontend knows where the suggestion comes from
    const suggestions = [
      ...products.map(p => ({ id: p.id, name: p.name, type: "product" })),
      ...services.map(s => ({ id: s.id, name: s.name, type: "service" }))
    ];

    res.status(200).json({ 
        status: 'success',
        suggestions
    });

  } catch (error) {
    console.error("Error in autocomplete:", error);
    res.status(500).json({ error: "Server error while fetching suggestions" });
  }
};


