import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { investorProfile } from '../../http/controllers/private/profileController.js';


const profileRoutes = express.Router();

profileRoutes.get('/me', [authMiddleware], investorProfile);

export default profileRoutes;
