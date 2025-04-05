import { Router, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
import { User } from '../models/index.js';

const router = Router();

// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log('Register request body:', req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    console.log('Creating new user...');
    const newUser = await User.create({ username, email, password });
    console.log('New user created:', newUser);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    console.log('User found:', !!user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (user not found)' });
    }

    const isMatch = await user.isValidPassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Something went wrong during login' });
  }
});

export default router;