export const SendSocketResponse = (socket, event, data, message) => {
    const isSuccess = true;
    const msg = message || (isSuccess ? 'Operation successful' : 'An error occurred');

    const response = { status: isSuccess ? "Success" : "ERROR", message: msg };

    // Add data to the response if it's not null
    if (data !== null) {
        response.data = data;
    }

    socket.emit(event, response);
};
