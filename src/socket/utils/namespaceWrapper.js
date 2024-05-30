export const NamespaceWrapper = (namespaceFunc) => {
    return async (socket, ...args) => {
        try {
            await namespaceFunc(socket, ...args);
        } catch (error) {
            // Handle the error appropriately
            // For example, emit an error event back to the client
            socket.emit('errorEvent', { message: error.message });
        }
    };
};
