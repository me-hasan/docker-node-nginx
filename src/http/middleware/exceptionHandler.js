const exception = () => {
    process.on('unhandledRejection', (error) => {
        throw error;
    });
};

export default exception;