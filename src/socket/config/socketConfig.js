export const socketIoConfig = (httpServer) => {
  const io = new socketIoServer(httpServer, {
    cors: {
      origin: "*"
    }
  });
};
