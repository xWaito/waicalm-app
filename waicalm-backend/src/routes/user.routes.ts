import { Router } from 'express';
import {
  updateProfile,
  updateKitCode,
} from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.put('/profile', updateProfile);
router.put('/kit-code', updateKitCode);

export default router;

