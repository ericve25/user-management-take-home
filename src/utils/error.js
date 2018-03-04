const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.sendStatus(500);
};

const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = {
    errorMiddleware,
    wrap
}