import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwtToken.js';
import { sendEmail, welcomeEmailTemplate } from '../utils/emailSender.js';

// Register a User
export const registerUser = async (req, res) => {
    
    const { name, email, phone_number, password, confirm_password} = req.body;

     //Field validations
    if (!name) {
        return res.status(400).json({ 
            field: 'name', message: 'Name is required.' });
    }

    if (!email) {
    return res.status(400).json({
        field: 'email', message: 'Email is required.' });
    }

    if (!phone_number) {
    return res.status(400).json({
        field: 'phone_number', message: 'Phone number is required.' });
    }

    if (!password) {
    return res.status(400).json({ 
        field: 'password', message: 'Password is required.' });
    }

    if (password.length < 8) {
    return res.status(400).json({
        field: 'password', message: 'Password must be at least 8 characters long.' });
    }

    if (password !== confirm_password) {
    return res.status(400).json({
        field: 'confirm_password', message: 'Passwords do not match.' });
    }

    // Check if a user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({
            field: 'email',
            message: 'User with this email already exists.'
    });
}
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create user
    const user = await User.create({
        name : name,
        email: email,
        phone_number : phone_number,
        password: hashedPassword
    });

    // Remove password from response
    const { password: _, ...userData } = user.toJSON();

    // Send a welcome email
    await sendEmail({
      to: user.email,
      subject: "Welcome to Sanich Farms!",
      html: welcomeEmailTemplate(user.name),
    });

    res.status(201).json({
        status: "success",
        message: 'Account created successfully.',
        user: userData
    });
}



// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const getUser = await User.findOne({ where: { email } });

    if (!getUser) {
      return res.status(404).json({ field: 'email', message: 'User not found!' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch) {
      return res.status(401).json({ field: 'password', message: 'Incorrect password' });
    }

    // Generate JWT
    const accessToken = generateToken(getUser);

    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      accessToken
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Forgot password
export const forgotPassword = async (req, res, next) => {
    try {
    const { email } = req.body;
    
    if (!email) return res.status(400).json({ error: "Email is required" });

    const getUser = await User.findOne({ where: { email } });
    if (!getUser) return res.status(404).json({ error: "User not found" });
    
    // Generate a 6-digit reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();
    // Set code expiry (15 minutes from now)
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    getUser.reset_code = resetCode;
    getUser.reset_code_expires = expiry;
    await getUser.save();

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>Hello ${getUser.name},</p>
             <p>Your password reset code is <strong>${resetCode}</strong>.</p>
             <p>This code expires in 15 minutes.</p>`
    });

    res.status(200).json({
      message: "Reset code sent to email",
    });
  } catch (err) {
    next(err);
    }
}


// Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, code, new_password, confirm_password } = req.body;

    if (!email || !code || !new_password || !confirm_password)
      return res.status(400).json({ error: "All fields are required" });

    if (new_password.length < 8)
      return res.status(400).json({ error: "Password must be at least 8 characters long" });

    if (new_password !== confirm_password)
      return res.status(400).json({ error: "Passwords do not match" });

    const getUser = await User.findOne({ where: { email } });
    if (!getUser) return res.status(404).json({ error: "User not found" });

    if (
      getUser.reset_code !== code ||
      !getUser.reset_code_expires ||
      new Date(getUser.reset_code_expires) < new Date()
    ) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }
    
    const hashedPassword = await bcrypt.hash(new_password, 12);
    getUser.password = hashedPassword;

    // Clear the reset code fields
    getUser.reset_code = null;
    getUser.reset_code_expires = null;

    await getUser.save();

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>Hello ${getUser.name},</p>
             <p>Your password reset was successful.</p>`
    });
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

