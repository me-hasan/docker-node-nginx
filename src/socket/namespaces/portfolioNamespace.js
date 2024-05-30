import { logger } from '../../config/logger.js';
import { SendSocketResponse } from '../utils/sendSocketResponse.js';
import { fetchPortfolio } from '../services/portfolioService.js';
import { NamespaceWrapper } from '../utils/namespaceWrapper.js';

export const portfolioNamespace = NamespaceWrapper((namespace) => {
    namespace.on('connection', (socket) => {
        logger.info('User connected to portfolio with id:', socket.id);

        // Start polling at the specified interval
        const intervalId = setInterval(async () => {
            try {
                const portfolioData = await fetchPortfolio(socket.user._id);
                SendSocketResponse(socket, 'portfolioData', portfolioData);
            } catch (error) {
                logger.error(error.message);
                SendSocketResponse(socket, 'portfolioError', null, error.message);
            }
        }, 1000); // Adjust the interval as needed

        socket.on('disconnect', () => {
            logger.info(`User with id ${socket.id} disconnected from portfolio`);
            clearInterval(intervalId);
        });
    });
});
