import { Server as socketIoServer } from 'socket.io';
import { socketIoConfig } from './config/socketConfig.js';
import { PUBLIC_NAMESPACE_PATHS, PRIVATE_NAMESPACE_PATHS } from './config/namespacePaths.js';
import { setupPublicNamespace, setupPrivateNamespace } from './namespaceSetup.js';


export const initializeSocketIoServer = (httpServer) => {
  try {
    const io = new socketIoServer(httpServer, socketIoConfig);
    
    /**
     * Setup public namespace
     * =====================
     */
    setupPublicNamespace(io.of(PUBLIC_NAMESPACE_PATHS.test));
    setupPublicNamespace(io.of(PUBLIC_NAMESPACE_PATHS.trendingList));
    setupPublicNamespace(io.of(PUBLIC_NAMESPACE_PATHS.pricePerformance));


    /**
     * Setup private namespace
     * =======================
     */
    setupPrivateNamespace(io.of(PRIVATE_NAMESPACE_PATHS.portfolioPerformance));
    setupPrivateNamespace(io.of(PRIVATE_NAMESPACE_PATHS.portfolio));

    return io; // Return the io object
  } catch (error) {
    console.error('Error initializing Socket.IO server:', error);
  }
};

export default initializeSocketIoServer;
