import { logger } from '../../config/logger.js';
import { SendSocketResponse } from '../../socket/utils/sendSocketResponse.js';
import { fetchPortfolioPerformance } from '../services/portfolioPerformanceService.js';
import { NamespaceWrapper } from '../utils/namespaceWrapper.js';

export const portfolioPerformanceNamespace = NamespaceWrapper((namespace) => {
    namespace.on('connection', (socket) => {
        logger.info('User connected to portfolio performance with id:', socket.id);

        // Start polling at the specified interval
        const intervalId = setInterval(async () => {
            try {
                const portfolioData = await fetchPortfolioPerformance(socket.user._id);
                SendSocketResponse(socket, 'portfolioPerformanceData', portfolioData);
            } catch (error) {
                logger.error(error.message);
                SendSocketResponse(socket, 'portfolioPerformanceError', null, error.message);
            }
        }, 1000); // Adjust the interval as needed

        socket.on('disconnect', () => {
            logger.info(`User with id ${socket.id} disconnected from portfolio performance`);
            clearInterval(intervalId);
        });
    });
});
