import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { createRequestFeature, getRequestFeatureByFilter, voteRequestFeature } from '../../http/controllers/private/requestFeatureController.js';


const requestFeatureRoutes = express.Router();

// Create a new alert
requestFeatureRoutes.post('/create-request-feature', [authMiddleware], createRequestFeature);

// Get all alerts (for all companies)
requestFeatureRoutes.get('/get-request-feature/:filter', [authMiddleware], getRequestFeatureByFilter);

// Update an existing alert
requestFeatureRoutes.put('/request-feature/:featureId/vote', [authMiddleware], voteRequestFeature);


export default requestFeatureRoutes;
