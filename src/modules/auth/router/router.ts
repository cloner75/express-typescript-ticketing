import { Router } from 'express';
import Auth from './../controller/auth.controller';
import Validator from './../../../helpers/validator';
import { login, logout, signup, refreshToken } from './../interface/validate.joi';

const validate = new Validator('auth_service');
const router = Router();

const AuthController = new Auth();
router.post('/login', validate.validate(login, 'login'), AuthController.login);
router.post('/login', validate.validate(logout, 'logout'), AuthController.logout);
router.post('/signup', validate.validate(signup, 'signup'), AuthController.signup);
router.post('/refresh', validate.validate(refreshToken, 'refreshToken'), AuthController.refreshToken);

export default router;