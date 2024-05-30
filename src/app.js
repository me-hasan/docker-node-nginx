// app.js
import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';
import bootstrap from './http/bootstrap.js';
import initializeSocketIoServer from './socket/index.js';

const app = express();

/**
 * Create http server
 */
const httpServer = createServer(app);

/**
 * Create and handle WebSocket connections
 */
const io = initializeSocketIoServer(httpServer);

/**
 * Using Express's built-in JSON middleware
 */
app.use(express.json());

/**
 * Bootstrap the application (middleware, routes, etc.)
 */
bootstrap(app);

export { httpServer, io };

export default app;
