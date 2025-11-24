import { Router } from 'express';
import {
  createActivity,
  getActivities,
  getActivityById,
  deleteActivity,
} from '../controllers/activity.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.post('/', createActivity);
router.get('/', getActivities);
router.get('/:id', getActivityById);
router.delete('/:id', deleteActivity);

export default router;

