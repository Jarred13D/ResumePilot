import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import aiRoutes from './aiRoutes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Allow public access to /api/ai routes
router.use('/api/ai', aiRoutes);

router.use('/auth', authRoutes);

// Protect everything else under /api
router.use('/api/v1', authenticateToken, apiRoutes);

export default router;
