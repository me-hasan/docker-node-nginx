import { logger } from '../../config/logger.js';
import { SendSocketResponse } from '../utils/sendSocketResponse.js';
import { NamespaceWrapper } from '../utils/namespaceWrapper.js';
import {fetchTrendData } from '../services/trendingListService.js';

export const trendingListNamespace = NamespaceWrapper((namespace) => {
    namespace.on('connection', (socket) => {
        logger.info('User connected to trending list with id:', socket.id);

        // const trendId = socket.handshake.query.trendId;
        const trendId = socket.handshake.headers['trending-id'];

        // Start polling at the specified interval
        const intervalId = setInterval(async () => {
            try {
                const tredingData = await fetchTrendData(trendId);
                SendSocketResponse(socket, 'trendingListData', tredingData);
            } catch (error) {
                logger.error(error.message);
                SendSocketResponse(socket, 'trendingListError', null, error.message);
            }
        }, 1000); // Adjust the interval as needed

        socket.on('disconnect', () => {
            logger.info(`User with id ${socket.id} disconnected from trending list`);
            clearInterval(intervalId);
        });
    });
});
