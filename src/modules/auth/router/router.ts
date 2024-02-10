import { Router } from 'express';
import Auth from './../controller/auth.controller';
const router = Router();

const AuthController = new Auth();
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/refresh', AuthController.refreshToken);

export default router;