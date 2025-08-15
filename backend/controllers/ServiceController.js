import { Service } from '../models/Service.js';

// List all available services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { is_available: true },
      attributes: ['id', 'name', 'description', 'price', 'image_url'],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: "success",
      results: services.length,
      services
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Get single service details
export const getSingleService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const service = await Service.findByPk(serviceId, {
      attributes: ['id', 'name', 'description', 'price', 'image_url', 'is_available']
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({
      status: "success",
      service
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};
