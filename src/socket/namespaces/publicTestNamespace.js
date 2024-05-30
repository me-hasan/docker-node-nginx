import { Sequelize } from "sequelize";
import PortfolioPerformance from "../../models/portfolioPerformance.js";
import { logger } from "../../config/logger.js";

export const publicTestNamespace = (namespace) => {
    namespace.on('connection', (socket) => {
        console.log('User connected to test with id:', socket.id);

        // Function to fetch and emit data
        const fetchAndEmitData = () => {
            PortfolioPerformance.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('mature_balance')), 'totalPerformance']
                ]
            }).then(result => {
                const totalPerformance = result.length > 0 ? result[0].get('totalPerformance') : 0;
                socket.emit('testData', { totalPerformance: totalPerformance});
            }).catch(error => {
                logger.error(error.message, error);
            });
        };

        // Polling database for changes
        const intervalId = setInterval(fetchAndEmitData, 1000); // Adjust the interval as needed

        socket.on('disconnect', () => {
            console.log(`User with id ${socket.id} disconnected from test`);
            clearInterval(intervalId); // Clear the interval on disconnect
        });

        // Other event listeners for feature namespace...
    });
};
