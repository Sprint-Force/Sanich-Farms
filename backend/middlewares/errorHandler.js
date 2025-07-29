export const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";
    let details = null;

    //Handle known errors
    if (err.statusCode) {
        status = err.statusCode;
        message = err.message;
    } else if (err.name === "ValidationError") {
        status = 400;
        message = "Validation Error";
        details = err.errors || null;
    } else if (err.name === "EntityNotFound") {
        status = 404;
        message = "Resource not found"
    } else if (err.code === "23505") {
        status = 400;
        message = "Duplicate entry detected"
    }

    res.status(status).json({
        status, 
        error: message,
        ...(details && { details }),

    });
};