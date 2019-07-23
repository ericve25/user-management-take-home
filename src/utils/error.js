const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.sendStatus(500);
};

module.exports = {
    errorMiddleware
}