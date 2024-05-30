import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { createAlert, deleteAlert, deleteCompanyAlert, getAlertsByCompany, getAlertsByComCode, getAllAlerts, getAllAlertsByComCode, udpateStatusAlert, updateAlert, updateStatusCompanyAlert } from '../../http/controllers/private/alertController.js';


const alertRoutes = express.Router();

// Get allert id by trade code
alertRoutes.get('/get-alert/:comCode/alert', [authMiddleware], getAlertsByComCode);

// Get alerts for specific company by trade code
alertRoutes.get('/get-all-alerts/:comCode/alerts', [authMiddleware], getAllAlertsByComCode);

// Create a new alert
alertRoutes.post('/create-alert', [authMiddleware], createAlert);

// Get all alerts (for all companies)
alertRoutes.get('/get-all-alerts', [authMiddleware], getAllAlerts);

// Get alerts for a specific company
alertRoutes.get('/get-alerts/:companyId/alerts', [authMiddleware], getAlertsByCompany);

// Update an existing alert
alertRoutes.patch('/update-alert/:alertId/alert', [authMiddleware], updateAlert);

// Delete an existing alert company wise 
alertRoutes.delete('/delete-company/:companyId/alerts', [authMiddleware], deleteCompanyAlert);

// Delete an existing alerts 
alertRoutes.delete('/delete-alert/:alertId/alert', [authMiddleware], deleteAlert);

// Update status an existing company  
alertRoutes.patch('/update-status-company/:companyId/alerts', [authMiddleware], updateStatusCompanyAlert);

// Update status an existing alerts 
alertRoutes.patch('/update-status-alert/:alertId/alert', [authMiddleware], udpateStatusAlert);


export default alertRoutes;
