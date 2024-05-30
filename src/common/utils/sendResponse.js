export const SendResponse = (res, statusCode, data, message) => {
    const isSuccess = statusCode >= 200 && statusCode < 300;
    const msg = message || (isSuccess ? 'Operation successful' : 'An error occurred');

    const response = { status: isSuccess ? "Success" : "ERROR", message: msg };

    // Add data to the response if it's not null
    if (data !== null) {
        response.data = data;
    }

    res.status(statusCode).send(response);
};
