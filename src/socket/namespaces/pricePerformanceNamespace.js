import { logger } from '../../config/logger.js';
import { SendSocketResponse } from '../utils/sendSocketResponse.js';
import { NamespaceWrapper } from '../utils/namespaceWrapper.js';
import { fetchPricePerformance } from '../services/pricePerformanceService.js';

export const pricePerformanceNamespace = NamespaceWrapper((namespace) => {
    namespace.on('connection', (socket) => {
        logger.info('User connected to price performance with id:', socket.id);

        // Start polling at the specified interval
        const intervalId = setInterval(async () => {
            try {
                const comCode = socket.handshake.headers['com-code'];
                const portfolioData = await fetchPricePerformance(comCode);
                SendSocketResponse(socket, 'pricePerformanceData', portfolioData);
            } catch (error) {
                logger.error(error.message);
                SendSocketResponse(socket, 'pricePerformanceError', null, error.message);
            }
        }, 1000); // Adjust the interval as needed

        socket.on('disconnect', () => {
            logger.info(`User with id ${socket.id} disconnected from price performance`);
            clearInterval(intervalId);
        });
    });
});
