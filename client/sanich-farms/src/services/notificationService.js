import { notificationsAPI } from './api';

/**
 * NotificationService - Centralized notification management
 * Handles creating notifications based on different user actions and system events
 * Following modern e-commerce notification patterns
 */
class NotificationService {
  
  /**
   * Create a notification for a specific user or globally
   * @param {Object} notificationData - The notification details
   * @param {number|null} userId - Target user ID (null for system-wide notifications)
   * @param {string} type - Notification type (order, booking, payment, system)
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   */
  async createNotification({ userId = null, type, title, message }) {
    try {
      const notificationData = {
        user_id: userId,
        type,
        title,
        message,
        is_read: false
      };
      
      const response = await notificationsAPI.create(notificationData);
      console.log('Notification created:', response);
      return response;
    } catch (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }
  }

  // ===== ORDER NOTIFICATIONS =====

  /**
   * When user places an order - notify admin
   */
  async notifyAdminNewOrder(orderData) {
    return this.createNotification({
      userId: null, // System notification for admins
      type: 'order',
      title: '🛒 New Order Received',
      message: `Order #${orderData.id} placed by ${orderData.customer_name || 'Customer'} for ₦${orderData.total_amount?.toLocaleString()}`
    });
  }

  /**
   * When admin updates order status - notify user
   */
  async notifyUserOrderStatusUpdate(orderData, newStatus) {
    const statusMessages = {
      'confirmed': '✅ Your order has been confirmed and is being prepared.',
      'processing': '📦 Your order is now being processed.',
      'shipped': '🚚 Your order has been shipped and is on its way!',
      'delivered': '✅ Your order has been delivered. Thank you for your business!',
      'cancelled': '❌ Your order has been cancelled. You will receive a refund if payment was made.'
    };

    return this.createNotification({
      userId: orderData.user_id,
      type: 'order',
      title: `Order #${orderData.id} - ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      message: statusMessages[newStatus] || `Your order status has been updated to ${newStatus}.`
    });
  }

  /**
   * When admin marks cash order as paid - notify user
   */
  async notifyUserOrderPaymentConfirmed(orderData) {
    return this.createNotification({
      userId: orderData.user_id,
      type: 'payment',
      title: '💰 Payment Confirmed',
      message: `Payment for Order #${orderData.id} has been confirmed. Thank you!`
    });
  }

  /**
   * When order is cancelled - notify relevant party
   */
  async notifyOrderCancellation(orderData, cancelledBy = 'user') {
    if (cancelledBy === 'user') {
      // Notify admin when user cancels
      return this.createNotification({
        userId: null,
        type: 'order',
        title: '❌ Order Cancelled by Customer',
        message: `Order #${orderData.id} has been cancelled by ${orderData.customer_name || 'customer'}`
      });
    } else {
      // Notify user when admin cancels
      return this.createNotification({
        userId: orderData.user_id,
        type: 'order',
        title: '❌ Order Cancelled',
        message: `Order #${orderData.id} has been cancelled. You will receive a refund if payment was made.`
      });
    }
  }

  // ===== BOOKING NOTIFICATIONS =====

  /**
   * When user creates a booking - notify admin
   */
  async notifyAdminNewBooking(bookingData) {
    return this.createNotification({
      userId: null,
      type: 'booking',
      title: '📅 New Service Booking',
      message: `${bookingData.service_name} booking by ${bookingData.customer_name || 'Customer'} scheduled for ${new Date(bookingData.scheduled_date).toLocaleDateString()}`
    });
  }

  /**
   * When admin updates booking status - notify user
   */
  async notifyUserBookingStatusUpdate(bookingData, newStatus) {
    const statusMessages = {
      'confirmed': '✅ Your booking has been confirmed.',
      'in_progress': '🔄 Your service is currently in progress.',
      'completed': '✅ Your service has been completed. Thank you!',
      'cancelled': '❌ Your booking has been cancelled.',
      'rescheduled': '📅 Your booking has been rescheduled.'
    };

    return this.createNotification({
      userId: bookingData.user_id,
      type: 'booking',
      title: `${bookingData.service_name} - ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      message: statusMessages[newStatus] || `Your booking status has been updated to ${newStatus}.`
    });
  }

  /**
   * When admin schedules/reschedules booking - notify user
   */
  async notifyUserBookingScheduled(bookingData) {
    const scheduledDate = new Date(bookingData.scheduled_date);
    const isReschedule = bookingData.status === 'rescheduled';
    
    return this.createNotification({
      userId: bookingData.user_id,
      type: 'booking',
      title: isReschedule ? '📅 Booking Rescheduled' : '📅 Booking Scheduled',
      message: `Your ${bookingData.service_name} ${isReschedule ? 'has been rescheduled for' : 'is scheduled for'} ${scheduledDate.toLocaleDateString()} at ${scheduledDate.toLocaleTimeString()}`
    });
  }

  /**
   * Booking reminder (24 hours before) - notify user
   */
  async notifyUserBookingReminder(bookingData) {
    const scheduledDate = new Date(bookingData.scheduled_date);
    
    return this.createNotification({
      userId: bookingData.user_id,
      type: 'booking',
      title: '⏰ Booking Reminder',
      message: `Reminder: Your ${bookingData.service_name} is scheduled for tomorrow (${scheduledDate.toLocaleDateString()}) at ${scheduledDate.toLocaleTimeString()}`
    });
  }

  /**
   * When booking is cancelled - notify relevant party
   */
  async notifyBookingCancellation(bookingData, cancelledBy = 'user') {
    if (cancelledBy === 'user') {
      // Notify admin when user cancels
      return this.createNotification({
        userId: null,
        type: 'booking',
        title: '❌ Booking Cancelled by Customer',
        message: `${bookingData.service_name} booking by ${bookingData.customer_name || 'customer'} has been cancelled`
      });
    } else {
      // Notify user when admin cancels
      return this.createNotification({
        userId: bookingData.user_id,
        type: 'booking',
        title: '❌ Booking Cancelled',
        message: `Your ${bookingData.service_name} booking has been cancelled. We apologize for any inconvenience.`
      });
    }
  }

  // ===== SYSTEM NOTIFICATIONS =====

  /**
   * Welcome notification for new users
   */
  async notifyWelcomeUser(userData) {
    return this.createNotification({
      userId: userData.id,
      type: 'system',
      title: '🎉 Welcome to Sanich Farms!',
      message: `Hi ${userData.firstname || 'there'}! Welcome to Sanich Farms. Explore our quality poultry products and services.`
    });
  }

  /**
   * System maintenance notifications
   */
  async notifySystemMaintenance(message) {
    return this.createNotification({
      userId: null, // Global notification
      type: 'system',
      title: '🔧 System Maintenance',
      message: message
    });
  }

  /**
   * New product announcements
   */
  async notifyNewProducts(productData) {
    return this.createNotification({
      userId: null, // Global notification
      type: 'product',
      title: '🆕 New Products Available',
      message: `Check out our latest addition: ${productData.name}. Now available in our store!`
    });
  }

  /**
   * Promotional notifications
   */
  async notifyPromotion(promotionData) {
    return this.createNotification({
      userId: null, // Global notification
      type: 'system',
      title: '🎉 Special Offer',
      message: promotionData.message || 'Don\'t miss out on our special offers!'
    });
  }

  // ===== PAYMENT NOTIFICATIONS =====

  /**
   * Payment successful notification
   */
  async notifyPaymentSuccess(orderData, paymentData) {
    return this.createNotification({
      userId: orderData.user_id,
      type: 'payment',
      title: '✅ Payment Successful',
      message: `Payment of ₦${paymentData.amount?.toLocaleString()} for Order #${orderData.id} was successful.`
    });
  }

  /**
   * Payment failed notification
   */
  async notifyPaymentFailed(orderData) {
    return this.createNotification({
      userId: orderData.user_id,
      type: 'payment',
      title: '❌ Payment Failed',
      message: `Payment for Order #${orderData.id} failed. Please try again or contact support.`
    });
  }

  /**
   * Refund processed notification
   */
  async notifyRefundProcessed(orderData, refundAmount) {
    return this.createNotification({
      userId: orderData.user_id,
      type: 'payment',
      title: '💰 Refund Processed',
      message: `Refund of ₦${refundAmount?.toLocaleString()} for Order #${orderData.id} has been processed.`
    });
  }
}

// Export singleton instance
export default new NotificationService();