import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/login', authenticateToken, AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;