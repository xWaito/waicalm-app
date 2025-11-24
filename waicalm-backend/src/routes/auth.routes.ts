import { Router } from 'express';
import {
  register,
  login,
  getProfile,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRegister, validateLogin } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', authMiddleware, getProfile);

export default router;

