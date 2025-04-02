import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;  // Extract email and password from request body
  console.log('Login attempt:', email);

  // Find the user in the database by email
  const user = await User.findOne({
    where: { email },  // Use email as the identifier
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    console.log('User not found');

    return res.status(401).json({ message: 'Authentication failed' });
  }
  console.log('Found user:', user.email);
  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  console.log("Is password valid?", passwordIsValid);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    console.log('Invalid password');

    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  
  return res.json({ token });  // Send the token as a JSON response
};

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return res.status(400).json({ message: 'Username already exists' });

  // const hashedPassword = await bcrypt.hash(password, 10);
  const { email } = req.body; // Extract email from request body
  // await User.create({ username, email, password });
  const newUser = User.build({ username, email, password });
  await newUser.save();

  return res.status(201).json({ message: 'User registered successfully' });
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route
router.post('/register', register);  // Define the register route

export default router;  // Export the router instance
