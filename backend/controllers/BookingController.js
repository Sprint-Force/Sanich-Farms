import { Booking } from '../models/Booking.js'; 
import { Notification } from '../models/Notification.js';
import { Service } from '../models/Service.js';
import { User } from '../models/User.js';


// Create booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { serviceId,name, email, phone_number, location, booking_date, note } = req.body;

    // Validations
    if (!name || !email || !phone_number || !location || !booking_date) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Create booking
    const newBooking = await Booking.create({
      service_id: serviceId,
      user_id: userId,
      name,
      email,
      phone_number,
      location,
      booking_date,
      note: note || null 
    });

    // Trigger notification to admin
    await Notification.create({
      type: "booking",
      title: "New Booking",
      message: `Booking #${newBooking.id} made by ${name}`
    });

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};


// Update booking
export const updateBooking = async (req, res) =>{
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;
    // Fields to update
    const { booking_date, location, note } = req.body;

    const booking = await Booking.findOne({
      where: { id: bookingId, user_id: userId },
      include: { model: Service }
    });


    if (!booking) {
      return res.status(404).json({ error: "Booking not found!" });
    }

    // Prevent update if booking is completed or canceled
    if (["completed", "cancelled"].includes(booking.status)) {
        return res.status(400).json({ error: "Cannot update a completed or canceled booking" });
    }

    // Update provided fields
    if (booking_date) { booking.booking_date = booking_date}
    if (location) { booking.location = location}
    if (note !== undefined) { booking.note = note}

    // Save updated booking
    await booking.save();

    return res.status(200).json({
      status: "success",
      message: "Booking updated successfully",
      updatedBooking: booking
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ error: "Failed to update booking" });
  }
}
// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      where: { id: bookingId, user_id: userId },
      include: { model: Service }
    });


    if (!booking) {
      return res.status(404).json({ error: "Booking not found!" });
    }
    
    

    // Check booking status
  if (['pending', 'scheduled'].includes(booking.status)) {
    booking.status = 'cancelled';
    await booking.save()
    res.status(200).json({ 
      message: "Order cancelled successfully", booking});
  } else {
    return res.status(400).json({ 
      message: "You can only cancel booking that is pending or scheduled" });
  }

  } catch (error) {
    console.error("Cancel booking Error:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }  
}


// Fetch bookings based on roles (Admin/User)
export const getBookings = async (req, res) => {
  const { status } = req.query; // Optional filter for booking status

  const filters = {};
  if (status) filters.status = status;

  try {
    let bookings;

    if (req.user.role === 'admin') {
      // Admin can view all bookings with optional filters
      bookings = await Booking.findAll({
        where: filters,
        include: [
          {
            model: Service,
            attributes: ['id', 'name', 'description', 'price', 'image_url'],
          },
          {
            model: User,
            attributes: ['id', 'name', 'email', 'phone_number'],
          },
        ],
        order: [['created_at', 'DESC']],
      });
    } else {
      // User can only view their own bookings
      const userFilters = { ...filters, user_id: req.user.id };
      bookings = await Booking.findAll({
        where: userFilters,
        include: [
          {
            model: Service,
            attributes: ['id', 'name', 'description', 'price', 'image_url'],
          },
        ],
        order: [['created_at', 'DESC']],
      });
    }

    return res.status(200).json({
      status: 'success',
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch bookings',
      details: error.message,
    });
  }
};


// View a single booking
export const getSingleBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      where: { id: bookingId, user_id: userId },
      include: [
         {
          model: Service,
          attributes: ['id', 'name', 'description', 'price', 'image_url']
        }
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({
      status: "success",
      booking
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
}