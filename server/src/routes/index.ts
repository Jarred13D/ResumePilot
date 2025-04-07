import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import aiRoutes from './aiRoutes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Allow public access to /auth /api/ai routes
console.log('Registering /auth');
router.use('/auth', authRoutes);
console.log('Registering /api/ai');
router.use('/api/ai', aiRoutes);

// Protect everything else under /api
console.log('Registering /api/v1');
router.use('/api/v1', authenticateToken, apiRoutes);

export default router;
