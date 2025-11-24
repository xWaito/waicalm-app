import { Router } from 'express';
import {
  getStats,
  getCortisolData,
} from '../controllers/stats.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.get('/', getStats);
router.get('/cortisol', getCortisolData);

export default router;

