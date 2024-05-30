import helmet from 'helmet';
import compression from 'compression'; 
import cors from 'cors';
import { publicRouter, privateRouter } from '../routes/routes.js'; // Importing routes
import { ErrorHandler } from '../http/middleware/errorHandler.js'; // Error handling middleware
import exceptionHandler from '../http/middleware/exceptionHandler.js'; // Exception handling middleware

const bootstrap = (app) => {

    const isProduction = process.env.NODE_ENV === 'production';

    /**
     * Enable compression and helmet middleware only in production
     */
    if (isProduction) {
        app.use(helmet());
        app.use(compression());
    }
    
    
    /**
     * Configure CORS per-route or with specific options
     * Apply CORS options to your Express app
     */
    const productionOrigin = 'https://example.com';
    const corsOptions = {
        origin: (origin, callback) => {
            if (isProduction) {
                // In production, only allow a specific origin
                const isAllowedOrigin = origin === productionOrigin;
                callback(null, isAllowedOrigin);
            } else {
                // Allow any origin in non-production environments
                callback(null, true);
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    };
    

    // Apply CORS middleware with options
    app.use(cors(corsOptions));


    // Setup public and private routes
    app.use('/api', publicRouter);
    app.use('/api/private', privateRouter);

    /**
     * Global Error Handler Middleware
     * This middleware is applied to all routes across the application. It captures 
     * any errors that arise during request processing. These errors are then either 
     * passed to the next middleware in the stack for further handling, or a response 
     * is sent directly to the client with an appropriate status code and error message.
     */    
    app.use(ErrorHandler);

    // Exception handling (if any specific logic)
    app.use(exceptionHandler);
};

export default bootstrap;
