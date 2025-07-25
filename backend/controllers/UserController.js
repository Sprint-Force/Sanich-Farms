import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwtToken.js';

// Register a User
export const registerUser = async (req, res) => {
    
    const { name, email, phone_number, password, confirm_password} = req.body;

     //Fiedl validations
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
      return res.status(404).json({ field: 'email', message: 'Email does not exist!' });
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
