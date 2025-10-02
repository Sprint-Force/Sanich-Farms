import { Notification } from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const { type, unread } = req.query;

    // Build dynamic filter
    const whereClause = {};

    if (type) {
      whereClause.type = type; 
    }

    if (unread === "true") {
      whereClause.is_read = false;
    } else if (unread === "false") {
      whereClause.is_read = true;
    }

    const notifications = await Notification.findAll({
      where: whereClause,
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark single notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    await notification.update({ is_read: true });

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.update(
      { is_read: true },
      { where: { is_read: false } }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
