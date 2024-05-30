// server.js
import { httpServer } from './app.js';

const PORT = process.env.PORT || 3000;
let server;

const startServer = () => {
  return new Promise((resolve, reject) => {
    server = httpServer.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      resolve();
    });

    server.on('error', (err) => {
      reject(err);
    });
  });
};

const stopServer = () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Error starting server:', err);
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:');
  console.error(reason);
  // You can add more error handling or logging here if needed.
});

export { startServer, stopServer };
