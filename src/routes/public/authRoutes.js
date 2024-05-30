import express from 'express';
import {
  verifyToken,
  loginInvestor,
  refreshToken
} from '../../http/controllers/authController.js';
import { validCredentials } from '../../http/requests/auth/validCredentialsRequest.js';


const authRoutes = express.Router();

authRoutes.post('/verify-token', verifyToken);
authRoutes.post('/login', [validCredentials], loginInvestor);
authRoutes.post('/refresh-token', refreshToken);

export default authRoutes;
