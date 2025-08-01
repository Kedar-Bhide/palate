import { Router } from 'express';
import multer from 'multer';
import { CuisineController } from '../controllers/cuisineController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get('/', authenticateToken, CuisineController.getAllCuisines);
router.post('/log', authenticateToken, upload.single('photo'), CuisineController.logCuisine);
router.get('/logs', authenticateToken, CuisineController.getUserLogs);

export default router;