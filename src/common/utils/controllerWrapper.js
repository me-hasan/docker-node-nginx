export const ControllerWrapper = (controllerFunc) => {
    return async (req, res, next) => {
        try {
            await controllerFunc(req, res, next);
        } catch (error) {
            if (next) {
                next(error); // Pass the error to the next middleware (ideally the error handler)
            } 
        }
    };
};
