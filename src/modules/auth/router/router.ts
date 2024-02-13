import { Router } from 'express';
import Auth from './../controller/auth.controller';
import Validator from './../../../helpers/validator';
import { login, logout, signup } from './../interface/validate.joi';
import Authorization from '../../../helpers/authorization';
const validate = new Validator('auth_service');
const router = Router();

const AuthController = new Auth();
router.post('/login', validate.validate(login, 'POST'), AuthController.login);
router.post('/login', validate.validate(logout, 'POST'), AuthController.logout);
router.post('/signup', validate.validate(signup, 'POST'), AuthController.signup);
router.post('/refresh',
  Authorization.refreshToken,
  AuthController.refreshToken
);

export default router;