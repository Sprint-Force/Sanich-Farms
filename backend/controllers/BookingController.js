import { Booking } from '../models/Booking.js'; 


// Create booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.body.id; 
    const { name, email, phone_number, location, booking_date, note } = req.body;

    // Validations
    if (!name || !email || !phone_number || !location || !booking_date) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Create booking
    const newBooking = await Booking.create({
      user_id: userId,
      name,
      email,
      phone_number,
      location,
      booking_date,
      note: note || null 
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
